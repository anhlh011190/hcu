import axios, { Method } from "axios";
import { objectToQueryString } from "./object-string";
axios.defaults.withCredentials = false;
axios.defaults.timeout = 50 * 30 * 1000;

const defaults = {
  baseURL: "https://localhost:3000",
  headers: () => ({
    "Content-Type": "application/json",
    Accept: "application/json",
  }),
  error: {
    code: "INTERNAL_ERROR",
    message:
      "Something went wrong. Please check your internet connection or contact our support.",
    status: 503,
    data: {},
  },
};

const api = (method: Method, url: string, variables?: any) => {
  let headers = defaults.headers();

  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method,
      headers: headers,
      params: method === "get" ? variables : undefined,
      data: method !== "get" ? variables : undefined,
      withCredentials: false,
      paramsSerializer: objectToQueryString,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(defaults.error);
        }
      });
  });
};

export const Api = {
  get: (url: string, variables?: any): Promise<any> =>
    api("get", url, variables),
  post: (url: string, variables?: any): Promise<any> =>
    api("post", url, variables),
  put: (url: string, variables?: any): Promise<any> =>
    api("put", url, variables),
  patch: (url: string, variables?: any): Promise<any> =>
    api("PATCH", url, variables),
  delete: (url: string, variables?: any): Promise<any> =>
    api("delete", url, variables),
};
