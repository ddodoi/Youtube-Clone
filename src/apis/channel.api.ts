import { httpClient } from "./http.api";

interface ChannelFetchVideoParams {
    channelId: number;
}

export const fetchChannel = async ({ channelId }: ChannelFetchVideoParams) => {
    const response = await httpClient.get(`/channel/${channelId}/p`);
    return response.data;
};
