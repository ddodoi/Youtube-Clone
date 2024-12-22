import { http, HttpResponse } from "msw";
import { baseURL } from "../utils/baseURL";
import mock from "../utils/mock";

export const channelHandlers = [
    http.get(baseURL("/channel/:id/p"), ({ request }) => {
        const url = new URL(request.url);
        const channelId = Number(url.pathname.split("/")[2]) || null;

        if (!channelId) return HttpResponse.json(null, { status: 400 });

        const channel = mock.getChannel(channelId);

        return HttpResponse.json(channel);
    }),
];
