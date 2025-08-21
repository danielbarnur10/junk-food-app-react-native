import { Router } from 'express';
import authController from '../controllers/auth.controller'
const route = Router();

route.get('/me',authController.me);
route.post('/register',authController.register);
route.post('/login',authController.login);
route.get('/logout',authController.logout);

export default route;