export interface IMethods {
  delete: "DELETE";
  get: "GET";
  put: "PUT";
  post: "POST";
  patch: "PATCH";
}

export type RequestMethodsType = "DELETE" | "GET" | "PUT" | "POST" | "PATCH";

export interface IRequestParams {
  url?: string;
  pathId?: string | number;
  handler?: () => void;
}

export interface IAPIOptions {
  method?: RequestMethodsType;
  path?: string;
  body?: { [key: string]: unknown } | unknown[] | File;
  params?: IRequestParams;
  query?: string;
}
