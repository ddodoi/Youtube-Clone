import { httpClient } from "./http.api";
import { VideoListResponse } from "@@types/video.type";

interface FetchVideosParams {
    page?: number;
    limit?: number;
}

export const fetchVideos = async ({ page = 1, limit = 20 }: FetchVideosParams) => {
    const response = await httpClient.get<VideoListResponse>("/videos", {
        params: { page, limit }
    });
    return response.data;
};