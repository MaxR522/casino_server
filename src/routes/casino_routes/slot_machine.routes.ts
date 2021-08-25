import * as Express from 'express';

import LaunchSlotMachine from '../../controllers/slot_machine/launcher';
import jwtVerification from '../../middlewares/user/jwt_verification';
import authValidationFor from '../../middlewares/validators/auth_field_validator';
import checkValidationResult from '../../middlewares/validators/check_field_validator';

const router = Express.Router();

router.post(
  '/slot_machines',
  jwtVerification,
  authValidationFor('slot_machine'),
  checkValidationResult,
  LaunchSlotMachine
);

export default router;
