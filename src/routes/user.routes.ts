import { Router } from 'express';
import { userControllers } from '../controllers/userControllers';

const userRoutes = Router();

userRoutes.get('/user', userControllers.findAllUser);
userRoutes.post('/user', userControllers.createUser);
userRoutes.delete('/user/:id', userControllers.deleteUser);
userRoutes.get('/user/:id', userControllers.findUserById);
userRoutes.patch('/user/:id', userControllers.userUpdate);

export { userRoutes };