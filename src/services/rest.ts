import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
// import { stores } from "../index";
// import {
//   ApiCallErrorAction,
//   SetTokenAction,
// } from "../store/actions/apiStatusActions";

export default class RestService {
  client: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.client = axios.create(config);
    this.client.interceptors.request.use(
      async (config:any) => {
        // const token = await getToken();
        const token = ""
        if (token && !!config.headers) {
          config.headers["Authorization"] = token;
        }
        return config;
      },
      (error:any) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      async (response:any) => {
        if (response?.data?.token) {
          await setToken(response?.data?.token);
          this.client.defaults.headers.common["Authorization"] =
            response?.data?.token;
        }
        return response;
      },
      async (error:any) => {
        const originalRequest = error?.config;
        if (error?.response?.status === 403 && !originalRequest?._retry) {
          originalRequest._retry = true;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return this.client(originalRequest);
        } else if (
          error?.response?.status === 408 &&
          !originalRequest?._retry
        ) {
          originalRequest._retry = true;
          if (error?.response?.data?.token) {
            await setToken(error?.response?.data?.token);
            this.client.defaults.headers.common["Authorization"] =
              error.response?.data?.token;
            await new Promise((resolve) => setTimeout(resolve, 500));
            return this.client(originalRequest);
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return this.client(originalRequest);
        }

        return Promise.reject(error);
      }
    );
  }

  get(endpoint: string) {
    return this.client.get<any>(endpoint);
  }

  post(endpoint: string, payload: any) {
    return this.client.post<any>(endpoint, payload);
  }
  put(endpoint: string, payload: any) {
    return this.client.put<any>(endpoint, payload);
  }
}

// const getToken = async (): Promise<string | null | undefined> => {
// //   return stores.getState()?.authenticationMain?.validateOTP?.data?.token || "";
// };

const setToken = async (token: string) => {
//   return stores.dispatch(SetTokenAction(token));
};

// 408=> refresh
// 403=> expaired
// 500=> system exception
// 200=> succes and business error


export const serviceClient = new RestService({
  baseURL: 'http://localhost:5000',
});
