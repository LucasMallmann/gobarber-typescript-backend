interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailDTO {
  template: string;
  variables: ITemplateVariables;
}
