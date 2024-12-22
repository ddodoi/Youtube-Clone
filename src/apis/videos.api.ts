import { getToken } from "@stores/authStore";
import { createClient, httpClient } from "./http.api";
import { VideosResponse } from "@@types/video.type";

interface FetchVideosParams {
    page?: number;
    limit?: number;
    channelId?: number;
}

export const fetchVideos = async ({ page = 1, limit = 20, channelId }: FetchVideosParams) => {
    const response = await httpClient.get<VideosResponse>("/videos", {
        params: { page, limit, channelId },
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
