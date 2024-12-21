import { getToken } from "@stores/authStore";
import { createClient, httpClient } from "./http.api";
import { VideoListResponse } from "@@types/video.type";

interface FetchVideosParams {
    page?: number;
    limit?: number;
}

export const fetchVideos = async ({ page = 1, limit = 20 }: FetchVideosParams) => {
    const response = await httpClient.get<VideoListResponse>("/videos", {
        params: { page, limit },
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
