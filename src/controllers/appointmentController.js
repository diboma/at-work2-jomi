/**
 * APPOINTMENT CONTROLLER
 */

import { NAVITEMS } from '../lib/consts.js';
import { getUserIsCoach } from '../lib/utils.js';
import appointmentSchema from '../middleware/validation/appointmentValidation.js';

// Import models
import Appointment from '../models/Appointment.js';
import AppointmentType from '../models/AppointmentType.js';
import User from '../models/User.js';

/**
 * Index
 */
export const index = async (req, res) => {
  // Maatwerker: redirect to show page
  if (req.user.role.id === 2) {
    return res.redirect(`/afspraken/${req.user.id}`);
  }

  // Get flash messages
  const flash = req.flash('flash')[0] || {};

  // Get maatwerkers (for select element)
  const maatwerkers = await User.query()
    .select('id', 'firstname', 'lastname')
    .where('role_id', 2);

  // Render template
  res.render('appointment/index', {
    navItems: NAVITEMS,
    activeNav: 'afspraken',
    pageTitle: 'Afspraken',
    maatwerkers,
  });
};

/**
 * Show appointments
 */
export const showAppointments = async (req, res) => {
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
    return res.redirect('/afspraken', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Get appointment types
  const appointmentTypes = await AppointmentType.query();

  // Get appointments for this maatwerker
  const appointments = await Appointment.query()
    .withGraphFetched('[maatwerkcoach, type]')
    .where('maatwerker_id', maatwerkerId)
    .orderBy('date', 'desc');

  // Get latest pinned appointment
  const latestPinnedAppointment = await Appointment.query()
    .withGraphFetched('[type]')
    .where('maatwerker_id', maatwerkerId)
    .where('is_pinned', true)
    .orderBy('updated_at', 'desc')
    .first();

  // Render template
  res.render('appointment/show', {
    navItems: NAVITEMS,
    activeNav: 'afspraken',
    pageTitle: `Afspraken van ${maatwerker.firstname} ${maatwerker.lastname}`,
    appointments,
    appointmentTypes,
    isCoach: getUserIsCoach(req.user),
    urlAddAppointment: `/afspraken/${maatwerkerId}/toevoegen`,
    latestPinnedAppointment,
  });
};

/**
 * Show page to add an appointment
 */
export const showAddAppointment = async (req, res, next) => {
  // Get input errors
  const inputErrors = req.inputErrors || {};

  // Get id (maatwerker) from params
  const { maatwerkerId } = req.params;

  // Get maatwerker
  const maatwerker = await User.query().findById(maatwerkerId);
  if (!maatwerker) {
    return res.redirect('/afspraken', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Get appointment types
  const appointmentTypes = await AppointmentType.query();

  // Render template
  res.render('appointment/add', {
    navItems: NAVITEMS,
    activeNav: 'afspraken',
    pageTitle: 'Afspraak toevoegen',
    appointmentTypes,
    urlBtnBack: `/afspraken/${maatwerkerId}`,
    urlSubmit: `/afspraken/${maatwerker.id}/toevoegen`,
  });
};

/**
 * Handle add appointment
 */
export const handleAddAppointment = async (req, res, next) => {
  // Get id (maatwerker) from params
  const { maatwerkerId } = req.params;

  // Get maatwerker
  const maatwerker = await User.query().findById(maatwerkerId);
  if (!maatwerker) {
    return res.redirect('/afspraken', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Validate form
  const joiValidation = appointmentSchema.validate(req.body);

  if (joiValidation.error) {
    req.inputErrors = {};
    for (const detail of joiValidation.error.details) {
      req.inputErrors[detail.path[0]] = detail.message;
    }
    return next();
  }

  // Add appointment
  const now = Date.now();
  const newAppointment = {
    maatwerker_id: parseInt(maatwerkerId),
    maatwerkcoach_id: parseInt(req.user.id),
    appointment_type_id: parseInt(req.body.appointment_type_id),
    // date: `${req.body.date} ${req.body.time}`, // string (date time) - works, but not for ordering by date
    date: Date.parse(`${req.body.date} ${req.body.time}`), // number (timestamp)
    location: req.body.location,
    comment: req.body.comment,
    is_pinned: req.body?.is_pinned === 'on' ? true : false,
    created_at: now,
    updated_at: now,
  };
  await Appointment.query().insert(newAppointment);

  // Redirect
  return res.redirect(`/afspraken/${maatwerkerId}`);
};
