declare global {
    interface AxiosRequestConfig {
        urlParams?: Record<string, string>;
    }

    interface InternalAxiosRequestConfig {
        urlParams?: Record<string, string>;
    }
}
