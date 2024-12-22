import { Channel, VideoPost } from "@@types/channel.type";
import { fetchVideos } from "@apis/channel.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useChannel = () => {
    const params = useParams();
    const channelId = params.channelId;

    const getVideos = ({ pageParam }: { pageParam: number }) => {
        if (!channelId) return;
        return fetchVideos({
            channelId: Number(channelId),
            page: pageParam,
            limit: 20,
        });
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, isFetched } =
        useInfiniteQuery({
            queryKey: ["videos", channelId],
            queryFn: ({ pageParam }) => getVideos({ pageParam }),
            initialPageParam: 1,
            getNextPageParam: (lastPage) => {
                return lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined;
            },
        });

    const lastPageIdx = data ? data.pages.length - 1 : 0;
    const videos: VideoPost[] = data ? data.pages.flatMap((page) => page.userVideoposts) : [];
    const channel: Channel = data ? data.pages[lastPageIdx].channel : {};
    const subscribers = data ? data.pages[lastPageIdx].subscribers : 0;
    const videoCount = data ? data.pages[lastPageIdx].videoCount : 0;

    return {
        videos,
        channel,
        subscribers,
        videoCount,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        isFetched,
    };
};
