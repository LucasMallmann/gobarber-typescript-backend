import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(findFile => findFile === file);
    this.storage.splice(findIndex, 1);
  }

  async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }
}

export default FakeStorageProvider;
