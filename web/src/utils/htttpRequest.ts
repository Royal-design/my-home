/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import store from "../redux/store";
import { removeLoginUser } from "@/redux/slices/authSlice";
import { BASE_URL } from "@/config/setting";

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Request Interceptor ---
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth?.user?.accessToken;
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    if (config.data instanceof FormData) {
      config.headers.delete("Content-Type");
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// --- Response Interceptor ---
api.interceptors.response.use(
  (response: AxiosResponse): any => {
    const data = response.data;

    return {
      success: true,
      message: data?.message || "Request successful",
      data,
    } as ApiResponse;
  },
  (error: AxiosError): any => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized → logging out...");
        store.dispatch(removeLoginUser());
      }

      const errData = error.response.data as any;

      return Promise.reject({
        success: false,
        message: errData?.message || "Something went wrong",
        data: errData,
      } as ApiResponse);
    } else if (error.request) {
      return Promise.reject({
        success: false,
        message: "Network error. Please try again.",
      } as ApiResponse);
    } else {
      return Promise.reject({
        success: false,
        message: error.message,
      } as ApiResponse);
    }
  }
);

// --- Generic request wrapper ---
export const httpRequest = async <T = any>(
  url: string,
  method: AxiosRequestConfig["method"] = "get",
  body: any = null,
  others: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> => {
  const config: AxiosRequestConfig = {
    url,
    method,
    data: body,
    ...others,
  };

  if (body instanceof FormData) {
    if (config.headers) {
      delete config.headers["Content-Type"];
    } else {
      config.headers = {};
    }
  }

  return api(config);
};
