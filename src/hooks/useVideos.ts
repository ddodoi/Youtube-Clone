import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchVideos } from "../apis/videos.api";
import { Video } from "@@types/video.type";
import { useParams } from "react-router-dom";

export const useVideos = (limit: number = 20) => {
    const params = useParams();
    const channelId = Number(params.channelId) || undefined;

    const getVideos = ({ pageParam }: { pageParam: number }) => {
        return fetchVideos({
            channelId,
            page: pageParam,
            limit,
        });
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        isFetched,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["videos"],
        queryFn: ({ pageParam }) => getVideos({ pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined;
        },
    });

    const videos: Video[] = data ? data.pages.flatMap((page) => page.videos) : [];

    return {
        videos,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        isFetched,
        isLoading,
    };
};
