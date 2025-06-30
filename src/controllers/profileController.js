/**
 * PROFILE CONTROLLER
 */

import {
  AVATAR_EXT,
  AVATAR_PATH,
  AVATAR_VIEW_PATH,
  NAVITEMS,
} from '../lib/consts.js';
import fs from 'fs';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import { validationResult } from 'express-validator';

// Import models
import EmergencyContact from '../models/EmergencyContact.js';
import User from '../models/User.js';
import UserMeta from '../models/UserMeta.js';
import Workplace from '../models/Workplace.js';

/**
 * Show profile page
 */
export const showprofile = async (req, res) => {
  // Get user
  const user = await User.query()
    .findById(req.user.id)
    .withGraphFetched('[role, meta]');

  // Get emergency contacts
  const emergencyContacts = await EmergencyContact.query()
    .select('id', 'firstname', 'lastname')
    .orderBy('firstname');

  // Get workplaces
  const workplaces = await Workplace.query();

  // Set inputs
  const inputs = [
    {
      type: 'text',
      label: 'Voornaam',
      name: 'firstname',
      disabled: true,
      value: user.firstname,
    },
    {
      type: 'text',
      label: 'Familienaam',
      name: 'lastname',
      disabled: true,
      value: user.lastname,
    },
    {
      type: 'email',
      label: 'E-mail',
      name: 'email',
      disabled: true,
      value: user.email,
    },
    {
      type: 'text',
      label: 'Rijksregisternummer',
      name: 'RRN',
      pattern: '^[0-9]{11}$',
      disabled: true,
      value: user.meta?.RRN || null,
    },
    {
      type: 'text',
      label: 'Adres',
      name: 'address',
      disabled: true,
      value: user.meta?.address || null,
    },
    {
      type: 'text',
      label: 'Telefoonnummer',
      name: 'phone',
      disabled: true,
      value: user.meta?.phone || null,
    },
    {
      type: 'text',
      label: 'Communicatievoorkeur',
      name: 'communication_preference',
      disabled: true,
      value: user.meta?.communication_preference || null,
    },
    {
      type: 'text',
      label: 'Mutualiteit',
      name: 'health_insurance_fund',
      disabled: true,
      value: user.meta?.health_insurance_fund || null,
    },
  ];

  // Render template
  res.render('profile/index', {
    navItems: NAVITEMS,
    activeNav: 'profiel',
    pageTitle: 'Profiel',
    user,
    inputs,
    emergencyContacts,
    workplaces,
    avatarViewPath: AVATAR_VIEW_PATH,
  });
};

/**
 * Show page to edit profile
 */
export const showEditProfile = async (req, res) => {
  // Get flash messages
  const flash = req.flash || {};

  // Get user
  const user = await User.query()
    .findById(req.user.id)
    .withGraphFetched('[role, meta]');

  // Get emergency contacts
  const emergencyContacts = await EmergencyContact.query()
    .select('id', 'firstname', 'lastname')
    .orderBy('firstname');

  // Get workplaces
  const workplaces = await Workplace.query();

  // Set inputs
  const inputs = [
    {
      type: 'text',
      label: 'Voornaam',
      name: 'firstname',
      value: user.firstname
        ? user.firstname
        : req.body?.firstname
        ? req.body.firstname
        : '',
      error: req.inputErrors?.firstname ? req.inputErrors.firstname : '',
    },
    {
      type: 'text',
      label: 'Familienaam',
      name: 'lastname',
      value: user.lastname
        ? user.lastname
        : req.body?.lastname
        ? req.body.lastname
        : '',
      error: req.inputErrors?.lastname ? req.inputErrors.lastname : '',
    },
    {
      type: 'email',
      label: 'E-mail',
      name: 'email',
      value: user.email ? user.email : req.body?.email ? req.body.email : '',
      error: req.inputErrors?.email ? req.inputErrors.email : '',
    },
    {
      type: 'text',
      label: 'Rijksregisternummer',
      name: 'RRN',
      pattern: '^[0-9]{11}$',
      instructions:
        'Vul 11 cijfers in, geen spaties, geen streepjes, geen punten.',
      value: user.meta?.RRN
        ? user.meta.RRN
        : req.body?.meta?.RRN
        ? req.body.meta.RRN
        : '',
      error: req.inputErrors?.RRN ? req.inputErrors.RRN : '',
    },
    {
      type: 'text',
      label: 'Adres',
      name: 'address',
      value: user.meta?.address
        ? user.meta.address
        : req.body?.meta?.address
        ? req.body.meta.address
        : '',
      error: req.inputErrors?.address ? req.inputErrors.address : '',
    },
    {
      type: 'text',
      label: 'Telefoonnummer',
      name: 'phone',
      value: user.meta?.phone
        ? user.meta.phone
        : req.body?.meta?.phone
        ? req.body.meta.phone
        : '',
      error: req.inputErrors?.phone ? req.inputErrors.phone : '',
    },
    {
      type: 'text',
      label: 'Communicatievoorkeur',
      name: 'communication_preference',
      instructions: 'Bijvoorbeeld: SMS, email, ...',
      value: user.meta?.communication_preference
        ? user.meta.communication_preference
        : req.body?.meta?.communication_preference
        ? req.body.meta.communication_preference
        : '',
      error: req.inputErrors?.communication_preference
        ? req.inputErrors.communication_preference
        : '',
    },
    {
      type: 'text',
      label: 'Mutualiteit',
      name: 'health_insurance_fund',
      value: user.meta?.health_insurance_fund
        ? user.meta.health_insurance_fund
        : req.body?.meta?.health_insurance_fund
        ? req.body.meta.health_insurance_fund
        : '',
      error: req.inputErrors?.health_insurance_fund
        ? req.inputErrors.health_insurance_fund
        : '',
    },
  ];

  // Render template
  res.render('profile/edit', {
    navItems: NAVITEMS,
    activeNav: 'profiel',
    pageTitle: 'Wijzig profiel',
    flash,
    user,
    inputs,
    emergencyContacts,
    workplaces,
  });
};

/**
 * Handle profile edit
 */
export const handleEditProfile = async (req, res, next) => {
  try {
    // Validate form
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      // Get errors
      req.inputErrors = {};
      for (const { path, msg } of validationErrors.array())
        req.inputErrors[path] = msg;

      // Redirect to login page
      return next();
    }

    // Update user
    await User.query().findById(req.user.id).patch({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    });

    const metaObject = {
      RRN: req.body.RRN,
      address: req.body.address,
      phone: req.body.phone,
      communication_preference: req.body.communication_preference,
      health_insurance_fund: req.body.health_insurance_fund,
      emergency_contact_id: parseInt(req.body.emergency_contact_id) || null,
      workplace_id: parseInt(req.body.workplace_id) || null,
    };

    // Update user meta
    await UserMeta.query().where('user_id', req.user.id).patch(metaObject);

    // Update user avatar
    if (req.file) {
      const avatarFile = req.file;
      if (
        avatarFile.mimetype == 'image/png' ||
        avatarFile.mimetype == 'image/jpg' ||
        avatarFile.mimetype == 'image/jpeg'
      ) {
        // Delete old avatar
        const userMeta = await UserMeta.query()
          .where('user_id', req.user.id)
          .first();
        const oldAvatar = userMeta.avatar_url;
        if (oldAvatar && oldAvatar !== '') {
          const filePath = `${AVATAR_PATH}/${oldAvatar}`;
          fs.access(filePath, (err) => {
            if (!err) fs.rmSync(filePath);
          });
        }

        // Upload file
        const avatarFileName = `${uuid()}.${AVATAR_EXT}`;
        await sharp(avatarFile.buffer)
          .resize(128, 128, {
            fit: 'cover',
            withoutEnlargement: true,
          })
          .toFormat(AVATAR_EXT)
          .toFile(`${AVATAR_PATH}/${avatarFileName}`);
        // Write avatar_url to database
        await UserMeta.query()
          .where('user_id', req.user.id)
          .patch({ avatar_url: avatarFileName });
      }
    }

    // Redirect to login page
    return res.redirect('/profiel');
  } catch (error) {
    console.error(error);
    return next(error.message);
  }
};
