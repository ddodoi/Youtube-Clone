import { fakerKO as faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { baseURL } from "../utils/baseURL";

export interface LoginResponse {
    token: string;
    userName: string;
    avatarURL: string;
}

const data = {
    token: faker.internet.jwt({ payload: { iat: new Date().toISOString() } }),
    userName: faker.person.fullName(),
    avatarURL: faker.image.avatar(),
};

export const authHandlers = [
    http.post(baseURL("/login"), () => {
        console.log(data);
        return HttpResponse.json(data, {
            status: 201,
        });
    }),
];
