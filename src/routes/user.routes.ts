import { Router } from 'express';
import { userControllers } from '../controllers/userControllers';
import { JwtAuthentication } from '../middlewares/jwt-authentication.middleware';

const userRoutes = Router();

userRoutes.get('/user', JwtAuthentication, userControllers.findAllUser);
userRoutes.get('/user/me', JwtAuthentication, userControllers.currentUser);
userRoutes.post('/user', userControllers.createUser);
userRoutes.delete('/user', JwtAuthentication, userControllers.deleteUser);
userRoutes.get('/user/:id', JwtAuthentication, userControllers.findUserById);
userRoutes.patch('/user', JwtAuthentication, userControllers.updateUser);

export { userRoutes };
