/* eslint-disable no-unused-vars */
import { User } from '../models/user.model';

declare module 'express-serve-static-core' {

    interface Request {
        user?: User
    }
}
