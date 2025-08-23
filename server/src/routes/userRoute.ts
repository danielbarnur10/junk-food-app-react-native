import { Router } from 'express';
import authService from '../services/authService';
import userController from '../controllers/user.controller';

const router = Router();
router.use(authService.authenticateToken);
router.get('/', userController.getUserbyId);
router.get('/', userController.getAllUser);
router.post('/', userController.createUser);
router.delete('/', userController.removeUser);
router.patch('/', userController.updateUser);

export default router;