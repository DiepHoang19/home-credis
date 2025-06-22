/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosHeaders,
} from "axios";
import Cookies from "js-cookie";

const BASE_URL_API = "https://authen-auction-api.vercel.app";

const ACCESS_TOKEN = "accessToken";
const REFESH_TOKEN = "refreshToken";

interface FailedRequest {
  resolve: (value?: any) => void;
  reject: (error: any) => void;
  config: AxiosRequestConfig;
}

class ApiClient {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: FailedRequest[] = [];

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL_API,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = Cookies.get(ACCESS_TOKEN);

        if (token) {
          // Nếu config.headers là AxiosHeaders thì dùng trực tiếp
          if (
            config.headers &&
            typeof (config.headers as AxiosHeaders).set === "function"
          ) {
            (config.headers as AxiosHeaders).set(
              "Authorization",
              `Bearer ${token}`
            );
          } else {
            // Nếu headers chưa tồn tại hoặc không phải AxiosHeaders thì tạo mới
            config.headers = new AxiosHeaders({
              Authorization: `Bearer ${token}`,
            });
          }
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  private initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({
                resolve,
                reject,
                config: originalRequest,
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          const refreshToken = Cookies.get(REFESH_TOKEN);

          return new Promise((resolve, reject) => {
            axios
              .post(`${BASE_URL_API}/auth/refresh-token`, {
                token: refreshToken,
              })
              .then((res) => {
                const { accessToken } = res.data;
                Cookies.set(ACCESS_TOKEN, accessToken);

                this.instance.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${accessToken}`;

                this.processQueue(null, accessToken);
                resolve(this.instance(originalRequest));
              })
              .catch((err) => {
                this.processQueue(err, null);
                reject(err);
              })
              .finally(() => {
                this.isRefreshing = false;
              });
          });
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach((req) => {
      if (error) {
        req.reject(error);
      } else {
        // Bảo đảm headers là AxiosHeaders
        if (
          !req.config.headers ||
          typeof (req.config.headers as AxiosHeaders).set !== "function"
        ) {
          req.config.headers = new AxiosHeaders();
        }

        if (token) {
          (req.config.headers as AxiosHeaders).set(
            "Authorization",
            `Bearer ${token}`
          );
        }

        req.resolve(this.instance(req.config));
      }
    });

    this.failedQueue = [];
  }

  public getInstance() {
    return this.instance;
  }
}

const apiClient = new ApiClient().getInstance();
export default apiClient;
