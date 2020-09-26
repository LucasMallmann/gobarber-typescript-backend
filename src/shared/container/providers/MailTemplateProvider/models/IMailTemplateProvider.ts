import IParseMailTempalteDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTempalteDTO): Promise<string>;
}
