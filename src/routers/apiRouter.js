import express from 'express';

// Import middleware
import { jwtAuth } from '../middleware/jwtAuth.js';
import { isCoach } from '../middleware/authorisation/isCoach.js';

// Import controllers for user
import {
  handleUpdateCoach,
  showCoach,
  showEditCoach,
} from '../controllers/api/apiUserController.js';

// Import controllers for evaluation
import {
  deleteEval,
  handleUpdateEval,
  showEditEval,
  showEval,
} from '../controllers/api/apiEvaluationController.js';

// Import controllers for observation
import {
  deleteObservation,
  handleUpdateObservation,
  showEditObservation,
  showObservation,
} from '../controllers/api/apiObservationController.js';

// Import controllers for training
import {
  deleteTraining,
  handleUpdateTraining,
  showEditTraining,
  showTraining,
} from '../controllers/api/apiTrainingController.js';

// Import controllers for appointment
import {
  deleteAppointment,
  handleUpdateAppointment,
  showAppointment,
  showEditAppointment,
} from '../controllers/api/apiAppointmentController.js';

// Import controllers for accident
import {
  deleteAccident,
  handleUpdateAccident,
  showAccident,
  showEditAccident,
} from '../controllers/api/apiAccidentController.js';

/**
 * INIT ROUTER
 */
const router = express.Router();

/**
 * API ROUTES FOR USER
 */
router.get('/user/show/coach/:maatwerkerId', jwtAuth, isCoach, showCoach);
router.get('/user/edit/coach/:maatwerkerId', jwtAuth, isCoach, showEditCoach);
router.put(
  '/user/update/coach/:maatwerkerId',
  jwtAuth,
  isCoach,
  handleUpdateCoach
);

/**
 * API ROUTES FOR EVALUATION
 */
router.get('/eval/show/:type/:evalId', jwtAuth, isCoach, showEval);
router.get('/eval/edit/:type/:evalId', jwtAuth, isCoach, showEditEval);
router.put('/eval/update/:type/:evalId', jwtAuth, isCoach, handleUpdateEval);
router.delete('/eval/delete/:type/:evalId', jwtAuth, isCoach, deleteEval);

/**
 * API ROUTES FOR OBSERVATION
 */
router.get(
  '/observation/show/:observationId',
  jwtAuth,
  isCoach,
  showObservation
);
router.get(
  '/observation/edit/:observationId',
  jwtAuth,
  isCoach,
  showEditObservation
);
router.put(
  '/observation/update/:observationId',
  jwtAuth,
  isCoach,
  handleUpdateObservation
);
router.delete(
  '/observation/delete/:observationId',
  jwtAuth,
  isCoach,
  deleteObservation
);

/**
 * API ROUTES FOR TRAINING
 */
router.get('/training/show/:trainingId', jwtAuth, isCoach, showTraining);
router.get('/training/edit/:trainingId', jwtAuth, isCoach, showEditTraining);
router.put(
  '/training/update/:trainingId',
  jwtAuth,
  isCoach,
  handleUpdateTraining
);
router.delete('/training/delete/:trainingId', jwtAuth, isCoach, deleteTraining);

/**
 * API ROUTES FOR APPOINTMENT
 */
router.get(
  '/appointment/show/:appointmentId',
  jwtAuth,
  isCoach,
  showAppointment
);
router.get(
  '/appointment/edit/:appointmentId',
  jwtAuth,
  isCoach,
  showEditAppointment
);
router.put(
  '/appointment/update/:appointmentId',
  jwtAuth,
  isCoach,
  handleUpdateAppointment
);
router.delete(
  '/appointment/delete/:appointmentId',
  jwtAuth,
  isCoach,
  deleteAppointment
);

/**
 * API ROUTES FOR ACCIDENTS
 */
router.get('/accident/show/:accidentId', jwtAuth, isCoach, showAccident);
router.get('/accident/edit/:accidentId', jwtAuth, isCoach, showEditAccident);
router.put(
  '/accident/update/:accidentId',
  jwtAuth,
  isCoach,
  handleUpdateAccident
);
router.delete('/accident/delete/:accidentId', jwtAuth, isCoach, deleteAccident);

/**
 * EXPORT ROUTER
 */
export default router;
