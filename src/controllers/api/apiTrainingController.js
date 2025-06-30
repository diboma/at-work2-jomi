import Promise from 'bluebird';

// Import models
import User from '../../models/User.js';
import Training from '../../models/training/Training.js';

/**
 * Show training
 */
export const showTraining = async (req, res, next) => {
  const { trainingId } = req.params;

  // Get training
  const training = await Training.query()
    .withGraphFetched('[maatwerkcoach, type]')
    .findById(trainingId);

  if (!training) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'De opleiding werd niet gevonden',
      },
    });
  }

  // Return view
  return res.render('partials/training/api/show', {
    layout: null,
    training,
  });
};

/**
 * Show edit training
 */
export const showEditTraining = async (req, res, next) => {
  const { trainingId } = req.params;

  // Get training
  const training = await Training.query().findById(trainingId);

  if (!training) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'De opleiding werd niet gevonden',
      },
    });
  }

  // Get coaches
  const maatwerkcoaches = await User.query()
    .where('role_id', 1)
    .select('id', 'firstname', 'lastname');

  // Return view
  return res.render('partials/training/api/edit', {
    layout: null,
    maatwerkcoaches,
    training,
  });
};

/**
 * Handle update training
 */
export const handleUpdateTraining = async (req, res, next) => {
  const { trainingId } = req.params;

  // Get training
  const training = await Training.query().findById(trainingId);

  if (!training) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'De opleiding werd niet gevonden',
      },
    });
  }

  // Update training
  if (
    req.body.maatwerkcoach_id !== '' &&
    req.body.indicated_by_coach !== '' &&
    req.body.date !== '' &&
    req.body.time !== '' &&
    req.body.location !== '' &&
    req.body.title !== ''
  ) {
    await Training.query()
      .findById(trainingId)
      .patch({
        maatwerkcoach_id: parseInt(req.body.maatwerkcoach_id),
        indicated_by_coach: req.body.indicated_by_coach === '1' ? true : false,
        // date: `${req.body.date} ${req.body.time}`, // string (date time) - works, but not for ordering by date
        date: Date.parse(`${req.body.date} ${req.body.time}`), // number (timestamp)
        location: req.body.location,
        title: req.body.title,
        content: req.body.content,
        comment: req.body.comment,
        is_pinned: req.body?.is_pinned === 'on' ? true : false,
        updated_at: new Date(),
      });
  }

  // Get updated training
  const updatedTraining = await Training.query()
    .withGraphFetched('[maatwerkcoach, type]')
    .findById(trainingId);

  // Get latest pinned item
  const latestPinnedItem = await Training.query()
    .withGraphFetched('[type]')
    .where('maatwerker_id', updatedTraining.maatwerker_id)
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
  return res.render('partials/training/api/show', {
    layout: null,
    training: updatedTraining,
    hasPinnedItem: latestPinnedItem ? true : false,
    pinnedItemId: latestPinnedItem ? latestPinnedItem.id : null,
    pinnedItemTitle: latestPinnedItem?.type.name || null,
    pinnedItemHtml,
  });
};

/**
 * Handle delete training
 */
export const deleteTraining = async (req, res, next) => {
  try {
    const { trainingId } = req.params;

    // Get training
    const training = await Training.query()
      .withGraphFetched('[maatwerkcoach, type]')
      .findById(trainingId);

    if (!training) {
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De opleiding werd niet gevonden',
        },
      });
    }

    // Delete training
    await Training.query().deleteById(trainingId);

    // Get latest pinned item
    const latestPinnedItem = await Training.query()
      .withGraphFetched('[type]')
      .where('maatwerker_id', training.maatwerker_id)
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
    return res.render('partials/training/api/show', {
      layout: null,
      training,
      hasPinnedItem: latestPinnedItem ? true : false,
      pinnedItemId: latestPinnedItem ? latestPinnedItem.id : null,
      pinnedItemTitle: latestPinnedItem?.type.name || null,
      pinnedItemHtml,
    });
  } catch (error) {
    console.log(error);
  }
};
