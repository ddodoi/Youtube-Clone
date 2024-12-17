import { fakerKO as faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { baseURL } from "../utils/baseURL";
import { getToken } from "@stores/authStore";

export interface LoginResponse {
    token: string;
}

export interface UserInfoResponse {
    name: string;
    profileImageURL: string;
}

const user = {
    name: faker.person.fullName(),
    profileImageURL: faker.image.avatar(),
};

const token = {
    token: faker.internet.jwt({ payload: { iat: new Date().toISOString() } }),
};

export const authHandlers = [
    http.post(baseURL("/user/login"), () => {
        return HttpResponse.json<LoginResponse>(token, {
            status: 201,
        });
    }),
    http.get(baseURL("/user"), ({ request }) => {
        if (getToken() === request.headers.get("Authorization")) {
            return HttpResponse.json<UserInfoResponse>(user, {
                status: 200,
            });
        }
    }),
];
