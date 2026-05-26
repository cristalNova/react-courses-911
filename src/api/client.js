import axios from "axios";

const api = axios.create({
    baseURL: "/iaslab/compu2/911-api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    const isLoginRequest = config.url?.includes("/api/auth/login");
    const isRegisterRequest = config.url?.includes("/api/auth/register");

    if (token && !isLoginRequest && !isRegisterRequest) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;