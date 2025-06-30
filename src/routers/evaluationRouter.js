import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth.js';
import { isCoach } from '../middleware/authorisation/isCoach.js';
import {
  index,
  showStageList,
  showInstroomEvals,
  showStageEvals,
  showAddEvaluation,
  handleAddEvaluation,
} from '../controllers/evaluationController.js';
import inflowEvaluationValidation from '../middleware/validation/inflowEvaluationValidation.js';

/**
 * INIT ROUTER
 */
const router = express.Router();

/**
 * EVALUATION ROUTES
 */
router.get('/', jwtAuth, index);
router.get('/:id', jwtAuth, showStageList);

router.get('/:id/toevoegen/:type', jwtAuth, isCoach, showAddEvaluation);
router.post(
  '/:id/toevoegen/:type',
  jwtAuth,
  isCoach,
  // ...inflowEvaluationValidation,
  handleAddEvaluation,
  showAddEvaluation
);

router.get('/:id/instroom', jwtAuth, showInstroomEvals);
router.get('/:id/:slug', jwtAuth, showStageEvals);

/**
 * EXPORT ROUTER
 */
export default router;
