/**
 * GLOBAL CONTROLLER
 */

import { AVATAR_VIEW_PATH, NAVITEMS } from '../lib/consts.js';

// Import models
import User from '../models/User.js';

/**
 * Home
 * Maatwerker: sees buttons to go to the various pages
 * Maatwerkcoach: sees a list of maatwerkers
 */
export const home = async (req, res) => {
  // Get flash messages
  const flash = req.flash('flash')[0] || {};

  // Get logged in user
  const user = req.user;

  // Get all maatwerkers (role_id: 2)
  const maatwerkers = await User.query()
    .withGraphFetched(
      '[role, meta.[emergency_contact, workplace, maatwerkcoach]]'
    )
    .where('role_id', 2);

  // Render template
  res.render('home', {
    navItems: NAVITEMS,
    activeNav: 'home',
    pageTitle: 'Home',
    avatarViewPath: AVATAR_VIEW_PATH,
    flash,
    maatwerkers,
    user,
  });
};
