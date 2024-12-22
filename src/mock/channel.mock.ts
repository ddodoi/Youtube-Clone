import { http, HttpResponse } from "msw";
import { baseURL } from "../utils/baseURL";
import { Mock } from "../utils/mock";

export const channelHandlers = [
    http.get(baseURL("/channel/:id/p"), ({ request }) => {
        const url = new URL(request.url);
        const channelId = Number(url.pathname.split("/")[1]) || null;
        const mock = new Mock(100);
        const channel = mock.channel();

        console.log("channelId = ", channelId);

        if (!channelId) return HttpResponse.json(null, { status: 400 });
        return HttpResponse.json(channel);
    }),
];
