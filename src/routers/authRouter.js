import express from 'express';

// Import middleware
import { isLoggedOut, jwtAuth } from '../middleware/jwtAuth.js';
import loginValidation from '../middleware/validation/loginValidation.js';

// Import controllers
import { home } from '../controllers/homeController.js';
import {
  handleLogin,
  handleLogout,
  showLogin,
} from '../controllers/authController.js';

/**
 * INIT ROUTER
 */
const router = express.Router();

/**
 * AUTH ROUTES
 */
router.get('/', jwtAuth, home);
router.get('/login', isLoggedOut, showLogin);
router.post('/login', ...loginValidation, handleLogin, showLogin);
router.post('/logout', jwtAuth, handleLogout);
// router.get('/register', isLoggedOut, showRegister);
// router.post('/register', ...registerValidation, handleRegister, showRegister);

/**
 * EXPORT ROUTER
 */
export default router;
