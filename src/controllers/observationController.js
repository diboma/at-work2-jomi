/**
 * OBSERVATION CONTROLLER
 */

import { NAVITEMS } from '../lib/consts.js';
import { getUserIsCoach } from '../lib/utils.js';
import observationSchema from '../middleware/validation/observationValidation.js';

// Import models
import User from '../models/User.js';
import Observation from '../models/observation/Observation.js';
import ObservationType from '../models/observation/ObservationType.js';

/**
 * Index
 */
export const index = async (req, res) => {
  // Maatwerker: redirect to show page
  if (req.user.role.id === 2) {
    return res.redirect(`/observatie/${req.user.id}`);
  }

  // Get flash messages
  const flash = req.flash('flash')[0] || {};

  // Get maatwerkers (for select element)
  const maatwerkers = await User.query()
    .select('id', 'firstname', 'lastname')
    .where('role_id', 2);

  // Render template
  res.render('observation/index', {
    flash,
    navItems: NAVITEMS,
    activeNav: 'observatie',
    pageTitle: 'Observatie',
    maatwerkers,
  });
};

/**
 * Show observations
 */
export const showObservations = async (req, res, next) => {
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
    return res.redirect('/observatie', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Get observation types
  const observationTypes = await ObservationType.query();

  // Get observations
  const observations = await Observation.query()
    .withGraphFetched('[maatwerkcoach, type]')
    .where('maatwerker_id', maatwerkerId)
    .orderBy('updated_at', 'desc');

  // Get latest pinned observation
  const latestPinnedObservation = await Observation.query()
    .withGraphFetched('[type]')
    .where('maatwerker_id', maatwerkerId)
    .where('is_pinned', true)
    .orderBy('updated_at', 'desc')
    .first();

  // Render template
  res.render('observation/show', {
    navItems: NAVITEMS,
    activeNav: 'observatie',
    pageTitle: `Observaties van ${maatwerker.firstname} ${maatwerker.lastname}`,
    maatwerker,
    observationTypes,
    observations,
    isCoach: getUserIsCoach(req.user),
    urlAddObservation: `/observatie/${maatwerkerId}/toevoegen`,
    latestPinnedObservation,
  });
};

/**
 * Show page to add an observation
 */
export const showAddObservation = async (req, res, next) => {
  // Get input errors
  const inputErrors = req.inputErrors || {};

  // Get id (maatwerker) from params
  const { maatwerkerId } = req.params;

  // Get maatwerker
  const maatwerker = await User.query().findById(maatwerkerId);
  if (!maatwerker) {
    return res.redirect('/observatie', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Get observation types
  const observationTypes = await ObservationType.query();

  // Render template
  res.render('observation/add', {
    navItems: NAVITEMS,
    activeNav: 'observatie',
    pageTitle: 'Observatie toevoegen',
    observationTypes,
    urlBtnBack: `/observatie/${maatwerkerId}`,
    urlSubmit: `/observatie/${maatwerker.id}/toevoegen`,
  });
};

/**
 * Handle add observation
 */
export const handleAddObservation = async (req, res, next) => {
  // Get id (maatwerker) from params
  const { maatwerkerId } = req.params;

  // Get maatwerker
  const maatwerker = await User.query().findById(maatwerkerId);
  if (!maatwerker) {
    return res.redirect('/observatie', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Validate form
  const joiValidation = observationSchema.validate(req.body);

  if (joiValidation.error) {
    req.inputErrors = {};
    for (const detail of joiValidation.error.details) {
      req.inputErrors[detail.path[0]] = detail.message;
    }
    return next();
  }

  // Add observation
  const now = new Date();
  const newObservation = {
    maatwerker_id: parseInt(maatwerkerId),
    maatwerkcoach_id: parseInt(req.user.id),
    observation_type_id: parseInt(req.body.observation_type_id),
    content: req.body.content,
    comment: req.body.comment,
    is_pinned: req.body?.is_pinned === 'on' ? true : false,
    created_at: now,
    updated_at: now,
  };
  await Observation.query().insert(newObservation);

  // Redirect
  return res.redirect(`/observatie/${maatwerker.id}`);
};
