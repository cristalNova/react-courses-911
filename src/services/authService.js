import api from "../api/client.js";

export async function loginService(username, password) {
    const response = await api.post("/api/auth/login", {
        username,
        password,
    });

    return response.data;
}

export function logoutService() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return true;
}