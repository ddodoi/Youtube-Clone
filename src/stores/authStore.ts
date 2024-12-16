import { create } from "zustand";
import { LoginResponse } from "../mock/auth.mock";

export const getToken = () => {
    return localStorage.getItem("token");
};

const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

type StoreState = LoginResponse & {
    isLoggedIn: boolean;
    storeLogin: (data: LoginResponse) => void;
    storeLogout: () => void;
};

export const useAuthStore = create<StoreState>((set) => ({
    isLoggedIn: getToken() ? true : false,
    avatarURL: "",
    userName: "",
    token: "",
    storeLogin: ({ token, avatarURL, userName }) => {
        setToken(token);
        set(() => ({ isLoggedIn: true, avatarURL, userName, token }));
    },
    storeLogout: () => {
        removeToken();
        set(() => ({ isLoggedIn: false, avatarURL: "", userName: "", token: "" }));
    },
}));
