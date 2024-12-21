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

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ["videos", channelId],
        queryFn: ({ pageParam }) => getVideos({ pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined;
        },
    });

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading };
};
