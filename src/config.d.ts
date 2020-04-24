export interface Config {
  silent?: boolean;
  rowsName?: string;
  totalName?: string;
  page?: {
    pageName: string;
    sizeName: string;
  };
  warnHandler?: any;
  parameterFormat?: any;
}
