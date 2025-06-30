import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { TOKEN_STORAGE_KEY } from '../lib/consts.js';

export const jwtAuth = async (req, res, next) => {
  try {
    // Get token and userPayload
    const token = req.cookies[TOKEN_STORAGE_KEY];
    const userPayload = jwt.verify(token, process.env.TOKEN_SALT);

    // Get user
    const user = await User.query()
      .findOne({ id: userPayload.id })
      .withGraphFetched('[role, meta]');

    // Add user to request
    req.user = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar_url: user.meta?.avatar_url || null,
    };
    return next();
  } catch (error) {
    res.clearCookie(TOKEN_STORAGE_KEY);
    return res.redirect('/login');
  }
};

export const isLoggedOut = (req, res, next) => {
  if (req.cookies.token) return res.redirect('/');
  return next();
};
