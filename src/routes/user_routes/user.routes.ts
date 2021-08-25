import * as Express from 'express';

import AddScore from '../../controllers/user/add_score';

import jwtVerification from '../../middlewares/user/jwt_verification';

const router = Express.Router();

router.post('/score', jwtVerification, AddScore);

export default router;
