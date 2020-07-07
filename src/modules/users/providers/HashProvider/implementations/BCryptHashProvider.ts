import { hash, compare } from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}

export default BCryptHashProvider;
