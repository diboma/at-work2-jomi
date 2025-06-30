import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth.js';
import { index, show } from '../controllers/techSheetController.js';

/**
 * INIT ROUTER
 */
const router = express.Router();

/**
 * TECHNICAL SHEET ROUTES
 */
router.get('/', jwtAuth, index);
router.get('/:slug', jwtAuth, show, index);

/**
 * EXPORT ROUTER
 */
export default router;
