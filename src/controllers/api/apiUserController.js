// Import models
import User from '../../models/User.js';
import UserMeta from '../../models/UserMeta.js';

/**
 * Show coach
 */
export const showCoach = async (req, res, next) => {
  const { maatwerkerId } = req.params;

  // Get maatwerker
  const maatwerker = await User.query()
    .withGraphFetched('[meta.[maatwerkcoach]]')
    .findById(maatwerkerId);

  if (!maatwerker) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'De medewerker werd niet gevonden',
      },
    });
  }

  // Render template
  return res.render('partials/user/api/show-coach', {
    layout: null,
    maatwerker,
  });
};

/**
 * Show edit coach
 */
export const showEditCoach = async (req, res, next) => {
  const { maatwerkerId } = req.params;

  // Get maatwerker
  const maatwerker = await User.query()
    .withGraphFetched('[meta.[maatwerkcoach]]')
    .findById(maatwerkerId);

  if (!maatwerker) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'De medewerker werd niet gevonden',
      },
    });
  }

  // Get maatwerkcoaches
  const maatwerkcoaches = await User.query()
    .where('role_id', 1)
    .select('id', 'firstname', 'lastname');

  // Render template
  return res.render('partials/user/api/edit-coach', {
    layout: null,
    maatwerker,
    maatwerkcoaches,
  });
};

/**
 * Handle update coach
 */
export const handleUpdateCoach = async (req, res, next) => {
  // Get params
  const { maatwerkerId } = req.params;
  const { maatwerkcoach_id } = req.body;

  // Get user meta
  const userMeta = await UserMeta.query()
    .where('user_id', maatwerkerId)
    .first();
  if (!userMeta) {
    return res.render('partials/flash', {
      layout: null,
      flash: {
        type: 'danger',
        message: 'De medewerker werd niet gevonden',
      },
    });
  }

  if (maatwerkcoach_id !== '') {
    // Update maatwerker
    await UserMeta.query().where('user_id', maatwerkerId).patch({
      maatwerkcoach_id: maatwerkcoach_id,
    });
  }

  // Get updated maatwerker
  const updatedMaatwerker = await User.query()
    .withGraphFetched('[meta.[maatwerkcoach]]')
    .findById(maatwerkerId);

  // Get list of maatwerkers the current coach is following
  const maatwerkersFollowed = await UserMeta.query()
    .where('maatwerkcoach_id', req.user.id)
    .select('user_id');
  const followingIds = maatwerkersFollowed.map(
    (maatwerker) => maatwerker.user_id
  );

  // Render template
  return res.render('partials/user/api/show-coach', {
    layout: null,
    maatwerker: updatedMaatwerker,
    followingIds: followingIds.join(','),
  });
};
