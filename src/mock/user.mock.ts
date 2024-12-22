import { fakerKO as faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { baseURL } from "../utils/baseURL";
import { getToken } from "@stores/authStore";
import { LoginResponse } from "../types/user.type";
import mock from "../utils/mock";
import { Channel } from "@@types/channel.type";

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
            const user = mock.getRandomChannel();
            return HttpResponse.json<Channel>(user, {
                status: 200,
            });
        }
    }),
    http.get(baseURL("/user/sub"), ({ request }) => {
        if (getToken() === request.headers.get("Authorization")) {
            const subscriptions = mock.channels;
            return HttpResponse.json<Channel[]>(subscriptions, {
                status: 200,
            });
        }
    }),
    http.post(baseURL("/user/join"), async ({ request }) => {
        const req = await request.json();
        return HttpResponse.json(req, {
            status: 201,
        });
    }),
];
