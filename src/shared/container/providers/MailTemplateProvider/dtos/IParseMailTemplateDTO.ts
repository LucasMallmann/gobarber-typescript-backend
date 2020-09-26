interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailInterfaceDTO {
  template: string;
  variables: ITemplateVariables;
}
