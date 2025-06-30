import express from 'express';
import multer from 'multer';

// Import middleware
import { jwtAuth } from '../middleware/jwtAuth.js';
import profileValidation from '../middleware/validation/profileValidation.js';

// Import controllers
import {
  handleEditProfile,
  showEditProfile,
  showprofile,
} from '../controllers/profileController.js';

/**
 * INIT ROUTER
 */
const router = express.Router();

/**
 * PROFILE ROUTES
 */
router.get('/', jwtAuth, showprofile);
router.get('/wijzig', jwtAuth, showEditProfile);
router.post(
  '/wijzig',
  jwtAuth,
  multer().single('avatar'),
  ...profileValidation,
  handleEditProfile,
  showEditProfile
);

/**
 * EXPORT ROUTER
 */
export default router;
