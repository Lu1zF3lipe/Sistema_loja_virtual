import { hash } from 'bcryptjs';

export class SecurityService {
  public static async hash(text: string) {
    return hash(text, 10);
  }
}
