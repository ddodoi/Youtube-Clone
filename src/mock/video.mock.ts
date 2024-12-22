import { http, HttpResponse, delay } from "msw";
import { Video, VideosResponse } from "@@types/video.type";
import { baseURL } from "../utils/baseURL";
import { FORMDATA } from "../constants/formData";
import mock from "../utils/mock";

export const videoHandlers = [
    http.get(baseURL("/videos"), async ({ request }) => {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get("page")) || 1;
        const limit = Number(url.searchParams.get("limit")) || 20;
        const channelId = Number(url.searchParams.get("channelId")) || null;

        const response: VideosResponse = {
            videos: [],
            meta: mock.meta({ page, limit }),
        };
        if (channelId) {
            response.videos = mock.getChannelVideos({ channelId, page, limit });
        } else {
            response.videos = mock.getVideos({ page, limit });
        }

        await delay(500);

        if (!page || !limit) return HttpResponse.json(null, { status: 400 });
        return HttpResponse.json(response);
    }),
    http.post(baseURL("/videos/v"), async ({ request }) => {
        const formData = await request.formData();

        const videoFile = formData.get(FORMDATA.VIDEO_FILE);
        const thumbnailFile = formData.get(FORMDATA.THUMBNAIL_FILE);
        const description = formData.get(FORMDATA.DESCRIPTION);
        const postName = formData.get(FORMDATA.POST_NAME);
        const runningTime = formData.get(FORMDATA.RUNNING_TIME);

        console.log(videoFile, thumbnailFile, description, postName, runningTime);

        return HttpResponse.json(null, { status: 201 });
    }),

    http.get(baseURL("/videos/:videoId"), async ({ params }) => {
        const { videoId } = params;
        if (!videoId || Array.isArray(videoId)) return HttpResponse.json(null, { status: 400 });
        const videopostId = Number(videoId);

        const video: Video | null = mock.getVideo({ videopostId }) || null;
        if (!video) return HttpResponse.json(null, { status: 404 });

        return HttpResponse.json(video);
    }),

    // http.get(baseURL("/videos/s"), async ({ request }) => {
    //     const url = new URL(request.url);
    //     const page = Number(url.searchParams.get("page")) || 1;
    //     const limit = Number(url.searchParams.get("limit")) || 20;
    //     const searchQuery = url.searchParams.get("search_query");

    //     const response: VideosResponse = {
    //         videos: [],
    //         meta: mock.meta({ page, limit }),
    //     };
    //     if (searchQuery) {
    //         response.videos = mock.getKeywordVideos({ searchQuery, page, limit });
    //     } else {
    //         response.videos = mock.getVideos({ page, limit });
    //     }

    //     await delay(500);

    //     if (!page || !limit) return HttpResponse.json(null, { status: 400 });
    //     return HttpResponse.json(response);
    // }),
];
