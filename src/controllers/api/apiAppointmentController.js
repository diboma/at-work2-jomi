import Promise from 'bluebird';

// Import models
import User from '../../models/User.js';
import Appointment from '../../models/Appointment.js';

/**
 * Show appointment
 */
export const showAppointment = async (req, res, next) => {
  const { appointmentId } = req.params;

  // Get appointment
  const appointment = await Appointment.query()
    .withGraphFetched('[maatwerkcoach, type]')
    .findById(appointment);

  if (!appointment) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'De afspraak werd niet gevonden',
      },
    });
  }

  // Return view
  return res.render('partials/appointment/api/show', {
    layout: null,
    appointment,
  });
};

/**
 * Show edit appointment
 */
export const showEditAppointment = async (req, res, next) => {
  const { appointmentId } = req.params;

  // Get appointment
  const appointment = await Appointment.query().findById(appointmentId);

  if (!appointment) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'De afspraak werd niet gevonden',
      },
    });
  }

  // Get coaches
  const maatwerkcoaches = await User.query()
    .where('role_id', 1)
    .select('id', 'firstname', 'lastname');

  // Return view
  return res.render('partials/appointment/api/edit', {
    layout: null,
    maatwerkcoaches,
    appointment,
  });
};

/**
 * Handle update appointment
 */
export const handleUpdateAppointment = async (req, res, next) => {
  const { appointmentId } = req.params;

  // Get appointment
  const appointment = await Appointment.query().findById(appointmentId);

  if (!appointment) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'De afspraak werd niet gevonden',
      },
    });
  }

  // Update appointment
  if (
    req.body.maatwerkcoach_id !== '' &&
    req.body.date !== '' &&
    req.body.time !== '' &&
    req.body.location !== ''
  ) {
    await Appointment.query()
      .findById(appointmentId)
      .patch({
        maatwerkcoach_id: parseInt(req.body.maatwerkcoach_id),
        // date: `${req.body.date} ${req.body.time}`, // string (date time) - works, but not for ordering by date
        date: Date.parse(`${req.body.date} ${req.body.time}`), // number (timestamp)
        location: req.body.location,
        comment: req.body.comment,
        is_pinned: req.body?.is_pinned === 'on' ? true : false,
        updated_at: new Date(),
      });
  }

  // Get updated appointment
  const updatedAppointment = await Appointment.query()
    .withGraphFetched('[maatwerkcoach, type]')
    .findById(appointmentId);

  // Get latest pinned item
  const latestPinnedItem = await Appointment.query()
    .withGraphFetched('[type]')
    .where('maatwerker_id', updatedAppointment.maatwerker_id)
    .where('is_pinned', true)
    .orderBy('updated_at', 'desc')
    .first();

  // Get pinned item html
  let pinnedItemHtml = '';
  if (latestPinnedItem) {
    // Source: https://github.com/expressjs/express/issues/3631#issuecomment-383321020
    req.app.renderAsync = Promise.promisify(req.app.render);
    pinnedItemHtml = await req.app.renderAsync('partials/pinned-item', {
      layout: null,
      type: 'success',
      item: latestPinnedItem,
    });
  }

  // Return view
  return res.render('partials/appointment/api/show', {
    layout: null,
    appointment: updatedAppointment,
    hasPinnedItem: latestPinnedItem ? true : false,
    pinnedItemId: latestPinnedItem ? latestPinnedItem.id : null,
    pinnedItemTitle: latestPinnedItem?.type.name || null,
    pinnedItemHtml,
  });
};

/**
 * Handle delete appointment
 */
export const deleteAppointment = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;

    // Get appointment
    const appointment = await Appointment.query().findById(appointmentId);

    if (!appointment) {
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De afspraak werd niet gevonden',
        },
      });
    }

    // Delete appointment
    await Appointment.query().deleteById(appointmentId);

    // Get latest pinned item
    const latestPinnedItem = await Appointment.query()
      .withGraphFetched('[type]')
      .where('maatwerker_id', appointment.maatwerker_id)
      .where('is_pinned', true)
      .orderBy('updated_at', 'desc')
      .first();

    // Get pinned item html
    let pinnedItemHtml = '';
    if (latestPinnedItem) {
      // Source: https://github.com/expressjs/express/issues/3631#issuecomment-383321020
      req.app.renderAsync = Promise.promisify(req.app.render);
      pinnedItemHtml = await req.app.renderAsync('partials/pinned-item', {
        layout: null,
        type: 'success',
        item: latestPinnedItem,
      });
    }

    // Return view
    return res.send(
      `<div class="d-none" 
            id="item-deleted"
            data-has-pinned-item="${latestPinnedItem ? true : false}"
            data-pinned-item-id="${
              latestPinnedItem ? latestPinnedItem.id : null
            }"
            data-pinned-item-title="${latestPinnedItem?.type.name || null}"
            data-pinned-item-html='${pinnedItemHtml}'
        ></div>`
    );
  } catch (error) {
    console.log(error);
  }
};
