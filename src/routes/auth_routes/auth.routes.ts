/**
 * LOAD AUTHENTICATION ROUTES
 */

import * as Express from 'express';

import SignUp from '../../controllers/auth/signup';
import Login from '../../controllers/auth/login';

import authValidationFor from '../../middlewares/validators/auth_field_validator';
import checkValidationResult from '../../middlewares/validators/check_field_validator';
import checkDuplicateUsername from '../../middlewares/user/duplicate_username_check';
import checkDuplicateEmail from '../../middlewares/user/duplicate_email_check';
import VerifyPassword from '../../middlewares/user/verify_password';

const router = Express.Router();

router.post(
  '/signup',
  authValidationFor('signup'),
  checkValidationResult,
  checkDuplicateUsername,
  checkDuplicateEmail,
  SignUp
);

router.post(
  '/login',
  authValidationFor('login'),
  checkValidationResult,
  VerifyPassword,
  Login
);

export default router;
