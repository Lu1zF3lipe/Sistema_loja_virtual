import { hash } from 'bcryptjs';
import JWT from 'jsonwebtoken';

class SecurityService {
  public static async hash(text: string) {
    return hash(text, 10);
  }

  public static async createJWT({ id }) {
    const jwtPayload = {
      id,
    };

    const jwt = JWT.sign(jwtPayload, process.env.JWT_SECRET);
    return jwt;
  }
}

export { SecurityService };
