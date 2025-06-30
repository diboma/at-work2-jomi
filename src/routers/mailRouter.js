import express from 'express';

// Import controllers
import { test } from '../controllers/mailController.js';

/**
 * INIT ROUTER
 */
const router = express.Router();

/**
 * MAIL ROUTES
 */
router.get('/test', test);

/**
 * EXPORT ROUTER
 */
export default router;
