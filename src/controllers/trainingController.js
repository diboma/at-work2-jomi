/**
 * TRAINING CONTROLLER
 */

import { NAVITEMS } from '../lib/consts.js';
import { getUserIsCoach } from '../lib/utils.js';
import trainingSchema from '../middleware/validation/trainingValidation.js';

// Import models
import User from '../models/User.js';
import Training from '../models/training/Training.js';
import TrainingType from '../models/training/TrainingType.js';

/**
 * Index
 */
export const index = async (req, res) => {
  // Maatwerker: redirect to show page
  if (req.user.role.id === 2) {
    return res.redirect(`/opleiding/${req.user.id}`);
  }

  // Get flash messages
  const flash = req.flash('flash')[0] || {};

  // Get maatwerkers (for select element)
  const maatwerkers = await User.query()
    .select('id', 'firstname', 'lastname')
    .where('role_id', 2);

  // Render template
  res.render('training/index', {
    navItems: NAVITEMS,
    activeNav: 'opleiding',
    pageTitle: 'Opleiding',
    maatwerkers,
  });
};

/**
 * Show trainings
 */
export const showTrainings = async (req, res) => {
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
    return res.redirect('/opleiding', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Get training types
  const trainingTypes = await TrainingType.query();

  // Get trainings for this maatwerker
  const trainings = await Training.query()
    .withGraphFetched('[maatwerkcoach, type]')
    .where('maatwerker_id', maatwerkerId)
    .orderBy('date', 'desc');

  // Get latest pinned training
  const latestPinnedTraining = await Training.query()
    .withGraphFetched('[type]')
    .where('maatwerker_id', maatwerkerId)
    .where('is_pinned', true)
    .orderBy('updated_at', 'desc')
    .first();

  // Render template
  res.render('training/show', {
    navItems: NAVITEMS,
    activeNav: 'opleiding',
    pageTitle: `Opleidingen van ${maatwerker.firstname} ${maatwerker.lastname}`,
    trainings,
    trainingTypes,
    isCoach: getUserIsCoach(req.user),
    urlAddTraining: `/opleiding/${maatwerkerId}/toevoegen`,
    latestPinnedTraining,
  });
};

/**
 * Show page to add a training
 */
export const showAddTraining = async (req, res, next) => {
  // Get input errors
  const inputErrors = req.inputErrors || {};

  // Get id (maatwerker) from params
  const { maatwerkerId } = req.params;

  // Get maatwerker
  const maatwerker = await User.query().findById(maatwerkerId);
  if (!maatwerker) {
    return res.redirect('/opleiding', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Get training types
  const trainingTypes = await TrainingType.query();

  // Render template
  res.render('training/add', {
    navItems: NAVITEMS,
    activeNav: 'opleiding',
    pageTitle: 'Opleiding toevoegen',
    trainingTypes,
    urlBtnBack: `/opleiding/${maatwerkerId}`,
    urlSubmit: `/opleiding/${maatwerker.id}/toevoegen`,
  });
};

/**
 * Handle add training
 */
export const handleAddTraining = async (req, res, next) => {
  // Get id (maatwerker) from params
  const { maatwerkerId } = req.params;

  // Get maatwerker
  const maatwerker = await User.query().findById(maatwerkerId);
  if (!maatwerker) {
    return res.redirect('/opleiding', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Validate form
  const joiValidation = trainingSchema.validate(req.body);

  if (joiValidation.error) {
    req.inputErrors = {};
    for (const detail of joiValidation.error.details) {
      req.inputErrors[detail.path[0]] = detail.message;
    }
    return next();
  }

  // Add training
  const now = new Date();
  const newTraining = {
    maatwerker_id: parseInt(maatwerkerId),
    maatwerkcoach_id: parseInt(req.user.id),
    training_type_id: parseInt(req.body.training_type_id),
    indicated_by_coach: req.body.indicated_by_coach === '1' ? true : false,
    // date: `${req.body.date} ${req.body.time}`, // string (date time) - works, but not for ordering by date
    date: Date.parse(`${req.body.date} ${req.body.time}`), // number (timestamp)
    location: req.body.location,
    title: req.body.title,
    content: req.body.content,
    comment: req.body.comment,
    is_pinned: req.body?.is_pinned === 'on' ? true : false,
    created_at: now,
    updated_at: now,
  };
  await Training.query().insert(newTraining);

  // Redirect
  return res.redirect(`/opleiding/${maatwerkerId}`);
};
