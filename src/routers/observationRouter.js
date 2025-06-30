import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth.js';
import {
  handleAddObservation,
  index,
  showAddObservation,
  showObservations,
} from '../controllers/observationController.js';
import { isCoach } from '../middleware/authorisation/isCoach.js';

/**
 * INIT ROUTER
 */
const router = express.Router();

/**
 * OBSERVATION ROUTES
 */
router.get('/', jwtAuth, index);
router.get('/:maatwerkerId', jwtAuth, showObservations);
router.get('/:maatwerkerId/toevoegen', jwtAuth, isCoach, showAddObservation);
router.post(
  '/:maatwerkerId/toevoegen',
  jwtAuth,
  isCoach,
  handleAddObservation,
  showAddObservation
);

/**
 * EXPORT ROUTER
 */
export default router;
