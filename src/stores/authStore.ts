import { create } from "zustand";
import { LoginResponse } from "../mock/auth.mock";

type StoreState = LoginResponse & {
    isLoggedIn: boolean;
    storeLogin: (data: LoginResponse) => void;
    storeLogout: () => void;
};

export const getToken = () => {
    return localStorage.getItem("token");
};

const setLocalStorage = ({ token, userName, avatarURL }: LoginResponse) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    localStorage.setItem("avatarURL", avatarURL);
};

export const removeLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("avatarURL");
};

export const useAuthStore = create<StoreState>((set) => ({
    isLoggedIn: getToken() ? true : false,
    avatarURL: localStorage.getItem("avatarURL") || "",
    userName: localStorage.getItem("userName") || "",
    token: getToken() || "",
    storeLogin: (userData) => {
        setLocalStorage(userData);
        const { avatarURL, userName, token } = userData;
        set(() => ({ isLoggedIn: true, avatarURL, userName, token }));
    },
    storeLogout: () => {
        removeLocalStorage();
        set(() => ({ isLoggedIn: false, avatarURL: "", userName: "", token: "" }));
    },
}));
