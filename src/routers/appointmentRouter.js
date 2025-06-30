import express from 'express';

// Import middleware
import { jwtAuth } from '../middleware/jwtAuth.js';
import { isCoach } from '../middleware/authorisation/isCoach.js';

// Import controllers
import {
  handleAddAppointment,
  index,
  showAddAppointment,
  showAppointments,
} from '../controllers/appointmentController.js';

/**
 * INIT ROUTER
 */
const router = express.Router();

/**
 * APPOINTMENT ROUTES
 */
router.get('/', jwtAuth, index);
router.get('/:maatwerkerId', jwtAuth, showAppointments);
router.get('/:maatwerkerId/toevoegen', jwtAuth, isCoach, showAddAppointment);
router.post(
  '/:maatwerkerId/toevoegen',
  jwtAuth,
  isCoach,
  handleAddAppointment,
  showAddAppointment
);

/**
 * EXPORT ROUTER
 */
export default router;
