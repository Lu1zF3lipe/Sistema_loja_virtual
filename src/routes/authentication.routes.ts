import { Router } from 'express';
import { authenticationControlers } from '../controllers/authenticationControlers';

const authenticatioRoutes = Router();

authenticatioRoutes.post('/token', authenticationControlers.createJWT);

export { authenticatioRoutes };
