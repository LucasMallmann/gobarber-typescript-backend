import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    // Just return the template. Only for testing purpose. Does not need to know about the variables
    // Only returns the text
    return template;
  }
}

export default FakeMailTemplateProvider;
