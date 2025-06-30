import express from 'express';

// Import middleware
import { jwtAuth } from '../middleware/jwtAuth.js';
import { isCoach } from '../middleware/authorisation/isCoach.js';

// Import controllers
import {
  handleAddTraining,
  index,
  showAddTraining,
  showTrainings,
} from '../controllers/trainingController.js';

/**
 * INIT ROUTER
 */
const router = express.Router();

/**
 * TRAINING ROUTES
 */
router.get('/', jwtAuth, index);
router.get('/:maatwerkerId', jwtAuth, showTrainings);
router.get('/:maatwerkerId/toevoegen', jwtAuth, isCoach, showAddTraining);
router.post(
  '/:maatwerkerId/toevoegen',
  jwtAuth,
  isCoach,
  handleAddTraining,
  showAddTraining
);

/**
 * EXPORT ROUTER
 */
export default router;
