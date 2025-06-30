import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Role from '../models/Role.js';
import { TOKEN_STORAGE_KEY } from '../lib/consts.js';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

/**
 * Show page to login
 */
export const showLogin = (req, res) => {
  // Get flash messages
  const flash = req.flash || {};

  // Inputs
  const inputs = [
    {
      label: 'E-mail',
      type: 'email',
      name: 'email',
      required: true,
      value: req.body?.email ? req.body.email : '',
      error: req.inputErrors?.email ? req.inputErrors.email : '',
    },
    {
      label: 'Wachtwoord',
      type: 'password',
      name: 'password',
      required: true,
      value: req.body?.password ? req.body.password : '',
      error: req.inputErrors?.password ? req.inputErrors.password : '',
    },
  ];

  // Render template
  res.render('auth/login', {
    layout: 'auth',
    flash,
    inputs,
  });
};

/**
 * Handle login
 */
export const handleLogin = async (req, res, next) => {
  try {
    // Validate form
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      // Get errors
      req.inputErrors = {};
      for (const { path, msg } of validationErrors.array())
        req.inputErrors[path] = msg;

      // Set flash message
      req.flash = {
        type: 'danger',
        message: 'Er zijn fouten gevonden in het formulier',
      };

      // Redirect to login page
      return next();
    }

    // Check if user exists
    const { email } = req.body;
    const user = await User.query().findOne({ email }).withGraphFetched('role');

    if (!user) {
      req.flash = {
        type: 'danger',
        message: 'Foute inloggegevens.',
      };
      return next();
    }

    // Check if password is correct
    const { password } = req.body;
    if (!bcrypt.compareSync(password, user.password)) {
      req.flash = {
        type: 'danger',
        message: 'Foute inloggegevens.',
      };
      return next();
    }

    // Create a JSON Web Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.TOKEN_SALT,
      { expiresIn: 60 * 60 * 24 } // expiresIn = seconds
    );

    // Add token to cookie
    // res.cookie('token', token, { httpOnly: true });
    res.cookie(TOKEN_STORAGE_KEY, token, { httpOnly: true });

    // Redirect to home page
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error.message);
  }
};

/**
 * Show page to register
 */
export const showRegister = async (req, res) => {
  // Get flash messages
  const flash = req.flash || {};

  // Inputs
  const inputs = [
    {
      label: 'Voornaam',
      type: 'text',
      name: 'firstname',
      required: true,
      value: req.body?.firstname ? req.body.firstname : '',
      error: req.inputErrors?.firstname ? req.inputErrors.firstname : '',
    },
    {
      label: 'Familienaam',
      type: 'text',
      name: 'lastname',
      required: true,
      value: req.body?.lastname ? req.body.lastname : '',
      error: req.inputErrors?.lastname ? req.inputErrors.lastname : '',
    },
    {
      label: 'E-mail',
      type: 'email',
      name: 'email',
      required: true,
      value: req.body?.email ? req.body.email : '',
      error: req.inputErrors?.email ? req.inputErrors.email : '',
    },
    {
      label: 'Wachtwoord',
      type: 'password',
      name: 'password',
      required: true,
      value: req.body?.password ? req.body.password : '',
      error: req.inputErrors?.password ? req.inputErrors.password : '',
    },
  ];

  // Get roles
  const roles = await Role.query();

  // Render template
  res.render('auth/register', {
    layout: 'auth',
    flash,
    inputs,
    roles,
  });
};

/**
 * Handle registration
 */
export const handleRegister = async (req, res, next) => {
  try {
    // Validate form
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      // Get errors
      req.inputErrors = {};
      for (const { path, msg } of validationErrors.array())
        req.inputErrors[path] = msg;

      // Set flash message
      req.flash = {
        type: 'danger',
        message: 'Er zijn fouten gevonden in het formulier',
      };

      // Redirect to login page
      return next();
    }

    // Check if user already exists
    const { email } = req.body;
    const userExists = await User.query().findOne({ email });

    if (userExists) {
      req.flash = {
        type: 'danger',
        message: 'Gebruiker bestaat al.',
      };
      return next();
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // Create a new user
    const user = await User.query().insert({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      role_id: parseInt(req.body.role),
    });

    // Set flash message
    req.flash = {
      type: 'success',
      message: 'Uw account werd aangemaakt. U kan nu inloggen.',
    };

    // Redirect to login page
    return res.redirect('/login');
  } catch (error) {
    console.error(error);
    return next(error.message);
  }
};

/**
 * Handle logout
 */
export const handleLogout = (req, res, next) => {
  try {
    // res.clearCookie('token');
    res.clearCookie(TOKEN_STORAGE_KEY);
    return res.redirect('/login');
  } catch (error) {
    return next(error.message);
  }
};
