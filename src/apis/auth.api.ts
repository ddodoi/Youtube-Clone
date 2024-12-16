import { httpClient } from "./http.api";

export const loginUser = async (email: string, password: string) => {
    const response = await httpClient.post("/login", { email, password });
    console.log(response);
    return response.data;
};
