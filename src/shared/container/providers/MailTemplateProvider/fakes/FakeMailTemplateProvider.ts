import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  async parse(): Promise<string> {
    // Just return the template. Only for testing purpose. Does not need to know about the variables
    // Only returns the text
    return 'Mail template';
  }
}

export default FakeMailTemplateProvider;
