import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }

  async generateHash(payload: string): Promise<string> {
    return payload;
  }
}

export default FakeHashProvider;
