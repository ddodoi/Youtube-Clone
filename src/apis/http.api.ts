import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../stores/authStore";

const BASE_URL = import.meta.env.VITE_SERVER_URL;
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
            Authorization: getToken() || "",
        },
        withCredentials: true,
        ...config,
    });
    axiosInstance.interceptors.request.use(
        (config) => {
            config.headers.Authorization = getToken() || "";
            return config;
        },
        (error) => {
            console.log(error);
            Promise.reject(error);
        },
    );
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            // 토큰 만료 시
            if (error.response.status === 401) {
                removeToken();
                window.location.href = "/login"; // 추후 로그인 페이지 URL 결정되면 경로 수정
                return;
            }
        },
    );
    return axiosInstance;
};

export const httpClient = createClient();
