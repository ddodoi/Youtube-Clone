import { httpClient } from "./http.api";

interface ChannelFetchVideoParams {
    channelId: number;
    limit?: number;
    page?: number;
}

export const fetchVideos = async ({ channelId, limit = 20, page = 1 }: ChannelFetchVideoParams) => {
    const response = await httpClient.get(`/channel/${channelId}/p?limit=${limit}&page=${page}`);
    return response.data;
};
