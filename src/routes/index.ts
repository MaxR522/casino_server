/**
 * LOAD ALL ROUTES
 */

import * as Express from 'express';
const routes = Express.Router();

import AuthRoutes from './auth_routes/auth.routes';
import SlotMachineRoutes from './casino_routes/slot_machine.routes';
import UserRoutes from './user_routes/user.routes';

routes.use('/auth', AuthRoutes);
routes.use('/casino', SlotMachineRoutes);
routes.use('/user', UserRoutes);

export default routes;
