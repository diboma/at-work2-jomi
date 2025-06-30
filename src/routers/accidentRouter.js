import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth.js';
import { isCoach } from '../middleware/authorisation/isCoach.js';

// Import controllers
import {
  handleAddAccident,
  index,
  showAccidents,
  showAddAccident,
} from '../controllers/accidentController.js';

/**
 * INIT ROUTER
 */
const router = express.Router();

/**
 * ACCIDENT ROUTES
 */
router.get('/', jwtAuth, index);
router.get('/:maatwerkerId', jwtAuth, showAccidents);
router.get('/:maatwerkerId/toevoegen', jwtAuth, isCoach, showAddAccident);
router.post(
  '/:maatwerkerId/toevoegen',
  jwtAuth,
  isCoach,
  handleAddAccident,
  showAddAccident
);

/**
 * EXPORT ROUTER
 */
export default router;
