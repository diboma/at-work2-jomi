import Promise from 'bluebird';

// Import models
import User from '../../models/User.js';
import Accident from '../../models/Accident.js';
import { getDateTime } from '../../lib/utils.js';

/**
 * Show accident
 */
export const showAccident = async (req, res, next) => {
  const { accidentId } = req.params;
  const { canceled } = req.query;

  // Get accident
  const accident = await Accident.query()
    .withGraphFetched('[reportedBy]')
    .findById(accidentId);

  if (!accident) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'Het ongeval werd niet gevonden',
      },
    });
  }

  // Get view path
  let viewPath;
  if (canceled === 'true') {
    viewPath = 'partials/accident/api/show-canceled';
  } else {
    viewPath = 'partials/accident/api/show';
  }

  // Return view
  return res.render(viewPath, {
    layout: null,
    accident,
  });
};

/**
 * Show edit accident
 */
export const showEditAccident = async (req, res, next) => {
  const { accidentId } = req.params;

  // Get accident
  const accident = await Accident.query()
    .withGraphFetched('[reportedBy]')
    .findById(accidentId);

  if (!accident) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'Het ongeval werd niet gevonden',
      },
    });
  }

  // Get coaches
  const maatwerkcoaches = await User.query()
    .where('role_id', 1)
    .select('id', 'firstname', 'lastname');

  // Return view
  return res.render('partials/accident/api/edit', {
    layout: null,
    maatwerkcoaches,
    accident,
  });
};

/**
 * Handle update accident
 */
export const handleUpdateAccident = async (req, res, next) => {
  const { accidentId } = req.params;

  // Get accident
  const accident = await Accident.query().findById(accidentId);

  if (!accident) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'Het ongeval werd niet gevonden',
      },
    });
  }

  // Update accicent
  if (
    req.body.reported_by_id !== '' &&
    req.body.date !== '' &&
    req.body.time !== '' &&
    req.body.location !== '' &&
    req.body.cause !== '' &&
    req.body.injury !== '' &&
    req.body.care !== ''
  ) {
    await Accident.query()
      .findById(accidentId)
      .patch({
        reported_by_id: parseInt(req.body.reported_by_id),
        // date: `${req.body.date} ${req.body.time}`, // string (date time) - works, but not for ordering by date
        date: Date.parse(`${req.body.date} ${req.body.time}`), // number (timestamp)
        location: req.body.location,
        cause: req.body.cause,
        injury: req.body.injury,
        care: req.body.care,
        is_pinned: req.body?.is_pinned === 'on' ? true : false,
        updated_at: new Date(),
      });
  }

  // Get updated accident
  const updatedAccident = await Accident.query()
    .withGraphFetched('[reportedBy]')
    .findById(accidentId);

  // Get latest pinned item
  const latestPinnedItem = await Accident.query()
    .withGraphFetched('[reportedBy]')
    .where('maatwerker_id', updatedAccident.maatwerker_id)
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
      isAccident: true,
    });
  }

  // Return view
  return res.render('partials/accident/api/show', {
    layout: null,
    accident: updatedAccident,
    hasPinnedItem: latestPinnedItem ? true : false,
    pinnedItemId: latestPinnedItem ? latestPinnedItem.id : null,
    pinnedItemTitle: `
      <span>${getDateTime(latestPinnedItem?.date || null)}</span>
      <span>${latestPinnedItem?.location || null}</span>`,
    pinnedItemHtml,
  });
};

/**
 * Handle delete accident
 */
export const deleteAccident = async (req, res, next) => {
  try {
    const { accidentId } = req.params;

    // Get accident
    const accident = await Accident.query().findById(accidentId);

    if (!accident) {
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'Het ongeval werd niet gevonden',
        },
      });
    }

    // Delete accident
    await Accident.query().deleteById(accidentId);

    // Get latest pinned item
    const latestPinnedItem = await Accident.query()
      .withGraphFetched('[reportedBy]')
      .where('maatwerker_id', accident.maatwerker_id)
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
        isAccident: true,
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
            data-pinned-item-title="
              <span>${getDateTime(latestPinnedItem?.date)}</span>
              <span>${latestPinnedItem?.location}</span>"
            data-pinned-item-html='${pinnedItemHtml}'
        ></div>`
    );
  } catch (error) {
    console.log(error);
  }
};
