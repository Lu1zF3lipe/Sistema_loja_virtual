import { Router } from 'express';
import { userControllers } from '../controllers/userControllers';

const userRoutes = Router();

userRoutes.get('/user', userControllers.findAllUser);
