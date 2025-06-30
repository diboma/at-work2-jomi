import express from 'express';

// Import middleware
import { jwtAuth } from '../middleware/jwtAuth.js';
import { isCoach } from '../middleware/authorisation/isCoach.js';

// Import controllers
import {
  handleUpdateEquipments,
  index,
  showEditEquipments,
  showEquipments,
} from '../controllers/equipmentController.js';

/**
 * INIT ROUTER
 */
const router = express.Router();

/**
 * EQUIPMENT ROUTES
 */
router.get('/', jwtAuth, index);
router.get('/:maatwerkerId', jwtAuth, showEquipments);
router.get('/:maatwerkerId/bewerken', jwtAuth, isCoach, showEditEquipments);
router.post(
  '/:maatwerkerId/bewerken',
  jwtAuth,
  isCoach,
  handleUpdateEquipments,
  showEditEquipments
);

/**
 * EXPORT ROUTER
 */
export default router;
