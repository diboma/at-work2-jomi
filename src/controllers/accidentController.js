/**
 * ACCIDENT CONTROLLER
 */

import { NAVITEMS } from '../lib/consts.js';
import { getUserIsCoach } from '../lib/utils.js';

// Import validation
import accidentSchema from '../middleware/validation/accidentValidation.js';

// Import models
import Accident from '../models/Accident.js';
import User from '../models/User.js';

/**
 * Index
 */
export const index = async (req, res) => {
  // Maatwerker: redirect to show page
  if (req.user.role.id === 2) {
    return res.redirect(`/arbeidsongevallen/${req.user.id}`);
  }

  // Get flash messages
  const flash = req.flash('flash')[0] || {};

  // Get maatwerkers (for select element)
  const maatwerkers = await User.query()
    .select('id', 'firstname', 'lastname')
    .where('role_id', 2);

  // Render template
  res.render('accident/index', {
    navItems: NAVITEMS,
    activeNav: 'arbeidsongevallen',
    pageTitle: 'Arbeidsongevallen',
    maatwerkers,
  });
};

/**
 * Show accidents
 */
export const showAccidents = async (req, res) => {
  // Get id (maatwerker) from params
  const { maatwerkerId } = req.params;

  // Authorization
  if (
    req.user.role.id === 2 &&
    parseInt(maatwerkerId) !== parseInt(req.user.id)
  ) {
    return res.redirect('/', {
      flash: { message: 'Onvoldoende rechten', type: 'danger' },
    });
  }

  // Get maatwerker
  const maatwerker = await User.query().findById(maatwerkerId);
  if (!maatwerker) {
    return res.redirect('/arbeidsongevallen', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Get accidents for this maatwerker
  const accidents = await Accident.query()
    .orderBy('date', 'desc')
    .where('maatwerker_id', maatwerkerId)
    .withGraphFetched('[reportedBy]');

  // Get latest pinned accident
  const latestPinnedAccident = await Accident.query()
    .where('maatwerker_id', maatwerkerId)
    .where('is_pinned', true)
    .orderBy('updated_at', 'desc')
    .first();

  // Render template
  res.render('accident/show', {
    navItems: NAVITEMS,
    activeNav: 'arbeidsongevallen',
    pageTitle: `Arbeidsongevallen van ${maatwerker.firstname} ${maatwerker.lastname}`,
    accidents,
    isCoach: getUserIsCoach(req.user),
    urlAddAccident: `/arbeidsongevallen/${maatwerkerId}/toevoegen`,
    latestPinnedAccident,
  });
};

/**
 * Show page to add an accident
 */
export const showAddAccident = async (req, res, next) => {
  // Get input errors
  const inputErrors = req.inputErrors || {};

  // Get id (maatwerker) from params
  const { maatwerkerId } = req.params;

  // Get maatwerker
  const maatwerker = await User.query().findById(maatwerkerId);
  if (!maatwerker) {
    return res.redirect('/arbeidsongevallen', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Render template
  res.render('accident/add', {
    navItems: NAVITEMS,
    activeNav: 'arbeidsongevallen',
    pageTitle: 'Afspraak toevoegen',
    urlBtnBack: `/arbeidsongevallen/${maatwerkerId}`,
    urlSubmit: `/arbeidsongevallen/${maatwerker.id}/toevoegen`,
  });
};

/**
 * Handle add accident
 */
export const handleAddAccident = async (req, res, next) => {
  // Get id (maatwerker) from params
  const { maatwerkerId } = req.params;

  // Get maatwerker
  const maatwerker = await User.query().findById(maatwerkerId);
  if (!maatwerker) {
    return res.redirect('/arbeidsongevallen', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Validate form
  const joiValidation = accidentSchema.validate(req.body);

  if (joiValidation.error) {
    req.inputErrors = {};
    for (const detail of joiValidation.error.details) {
      req.inputErrors[detail.path[0]] = detail.message;
    }
    return next();
  }

  // Add accident
  const now = Date.now();
  const newAccident = {
    maatwerker_id: parseInt(maatwerkerId),
    reported_by_id: parseInt(req.user.id),
    // date: `${req.body.date} ${req.body.time}`, // string (date time) - works, but not for ordering by date
    date: Date.parse(`${req.body.date} ${req.body.time}`), // number (timestamp)
    location: req.body.location,
    cause: req.body.cause,
    injury: req.body.injury,
    care: req.body.care,
    is_pinned: req.body?.is_pinned === 'on' ? true : false,
    created_at: now,
    updated_at: now,
  };
  await Accident.query().insert(newAccident);

  // Redirect
  return res.redirect(`/arbeidsongevallen/${maatwerkerId}`);
};
