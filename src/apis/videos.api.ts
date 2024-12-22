import { getToken } from "@stores/authStore";
import { createClient, httpClient } from "./http.api";
import { Video, VideosResponse } from "@@types/video.type";

interface FetchVideosParams {
    page?: number;
    limit?: number;
    channelId?: number;
}

interface FetchKeywordVideosParams {
    page?: number;
    limit?: number;
    searchQuery: string;
}
export const fetchVideos = async ({ page = 1, limit = 20, channelId }: FetchVideosParams) => {
    const response = await httpClient.get<VideosResponse>("/videos", {
        params: { page, limit, channelId },
    });
    return response.data;
};

export const fetchVideo = async ({ videopostId }: { videopostId: number }) => {
    const response = await httpClient.get<Video>(`/videos/${videopostId}`);
    return response.data;
};

export const fetchKeywordVideos = async ({
    page = 1,
    limit = 20,
    searchQuery,
}: FetchKeywordVideosParams) => {
    const response = await httpClient.get<VideosResponse>("/videos/s", {
        params: { page, limit, search_query: searchQuery },
    });
    return response.data;
};

export const createVideo = async (formData: FormData) => {
    const httpClient = createClient({
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: getToken() || "",
        },
    });
    const response = await httpClient.post("/videos/v", formData);

    return response.data;
};
