import { fakerKO as faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { baseURL } from "../utils/baseURL";
import { getToken } from "@stores/authStore";
import { LoginResponse, SubscriptionResponse, UserInfoResponse } from "../types/user.type";

const user = {
    name: faker.person.fullName(),
    profileImageURL: faker.image.avatar(),
};

const token = {
    token: faker.internet.jwt({ payload: { iat: new Date().toISOString() } }),
};

const subscriptions = Array.from({ length: 10 }, () => ({
    channelName: faker.person.fullName(),
    channelEmail: faker.internet.email(),
    profileImageURL: faker.image.avatar(),
}));

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
    http.get(baseURL("/user/sub"), ({ request }) => {
        if (getToken() === request.headers.get("Authorization")) {
            return HttpResponse.json<SubscriptionResponse[]>(subscriptions, {
                status: 200,
            });
        }
    }),
];
