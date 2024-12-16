import { create } from "zustand";

type StoreState = {
    isLoggedIn: boolean;
    storeLogin: (token: string) => void;
    storeLogout: () => void;
};

export const getToken = () => {
    return localStorage.getItem("token");
};

const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const useAuthStore = create<StoreState>((set) => ({
    isLoggedIn: getToken() ? true : false,
    storeLogin: (token) => {
        setToken(token);
        set(() => ({ isLoggedIn: true }));
    },
    storeLogout: () => {
        removeToken();
        set(() => ({ isLoggedIn: false }));
    },
}));
