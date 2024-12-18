import { httpClient } from "./http.api";

export const createLogin = async(email: string, password: string) => {
    const response = await httpClient.post("/user/login", { email, password });
    return response.data;
};

export const fetchUserInfo = async() => {
    const response = await httpClient.get("/user");
    return response.data;
};
