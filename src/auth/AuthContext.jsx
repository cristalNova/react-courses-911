import {createContext, useContext, useEffect, useState} from "react";
import { loginService, logoutService } from "../services/authService.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch{
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return null;
        }
    });

    const login = async (username, password) => {
        const data = await loginService(username, password);

        if (!data.token) {
            throw new Error("El backend no envió un token JWT.");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));

        setUser(data);

        return data;
    };

    const logout = () => {
        logoutService();
        setUser(null);
    };

    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}