import Promise from 'bluebird';

// Import models
import Observation from '../../models/observation/Observation.js';
import ObservationType from '../../models/observation/ObservationType.js';
import User from '../../models/User.js';

/**
 * Show observation
 */
export const showObservation = async (req, res, next) => {
  const { observationId } = req.params;

  // Get observation
  const observation = await Observation.query()
    .withGraphFetched('[maatwerkcoach, type]')
    .findById(observationId);

  if (!observation) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'De observatie werd niet gevonden',
      },
    });
  }

  // Return view
  return res.render('partials/observation/api/show', {
    layout: null,
    observation,
  });
};

/**
 * Show edit observation
 */
export const showEditObservation = async (req, res, next) => {
  const { observationId } = req.params;

  // Get observation
  const observation = await Observation.query().findById(observationId);

  if (!observation) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'De observatie werd niet gevonden',
      },
    });
  }

  // Get coaches
  const maatwerkcoaches = await User.query()
    .where('role_id', 1)
    .select('id', 'firstname', 'lastname');

  // Get observation types
  const observationTypes = await ObservationType.query();

  // Return view
  return res.render('partials/observation/api/edit', {
    layout: null,
    maatwerkcoaches,
    observation,
    observationTypes,
  });
};

/**
 * Handle update observation
 */
export const handleUpdateObservation = async (req, res, next) => {
  const { observationId } = req.params;

  // Get observation
  const observation = await Observation.query().findById(observationId);

  if (!observation) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'De observatie werd niet gevonden',
      },
    });
  }

  // Update observation
  if (req.body.maatwerkcoach_id !== '' && req.body.content !== '') {
    await Observation.query()
      .findById(observationId)
      .patch({
        maatwerkcoach_id: parseInt(req.body.maatwerkcoach_id),
        content: req.body.content,
        comment: req.body.comment,
        is_pinned: req.body?.is_pinned === 'on' ? true : false,
        updated_at: new Date(),
      });
  }

  // Get updated observation
  const updatedObservation = await Observation.query()
    .withGraphFetched('[maatwerkcoach, type]')
    .findById(observationId);

  // Get latest pinned item
  const latestPinnedItem = await Observation.query()
    .withGraphFetched('[type]')
    .where('maatwerker_id', updatedObservation.maatwerker_id)
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
  return res.render('partials/observation/api/show', {
    layout: null,
    observation: updatedObservation,
    hasPinnedItem: latestPinnedItem ? true : false,
    pinnedItemId: latestPinnedItem ? latestPinnedItem.id : null,
    pinnedItemTitle: latestPinnedItem?.type.name || null,
    pinnedItemHtml,
  });
};

/**
 * Handle delete observation
 */
export const deleteObservation = async (req, res, next) => {
  try {
    const { observationId } = req.params;

    // Get observation
    const observation = await Observation.query().findById(observationId);

    if (!observation) {
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De observatie werd niet gevonden',
        },
      });
    }

    // Delete observation
    await Observation.query().deleteById(observationId);

    // Get latest pinned item
    const latestPinnedItem = await Observation.query()
      .withGraphFetched('[type]')
      .where('maatwerker_id', observation.maatwerker_id)
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
