import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchVideos } from "../apis/videos.api";
import { Video } from "@@types/video.type";
import { useParams } from "react-router-dom";

export const useVideos = (limit: number = 20) => {
    const params = useParams();
    const channelId = Number(params.channelId) || undefined;
    // return useInfiniteQuery({
    //     queryKey: ["videos"],
    //     queryFn: ({ pageParam = 1 }) => fetchVideos({ page: pageParam, limit }),
    //     getNextPageParam: (lastPage) => {
    //         if (!lastPage.meta) return undefined;
    //         return lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined;
    //     },
    //     initialPageParam: 1,
    // });

    const getVideos = ({ pageParam }: { pageParam: number }) => {
        return fetchVideos({
            channelId,
            page: pageParam,
            limit,
        });
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, isFetched } =
        useInfiniteQuery({
            queryKey: ["videos"],
            queryFn: ({ pageParam }) => getVideos({ pageParam }),
            initialPageParam: 1,
            getNextPageParam: (lastPage) => {
                return lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined;
            },
        });

    console.log(data);
    const videos: Video[] = data ? data.pages.flatMap((page) => page.videos) : [];

    return {
        videos,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        isFetched,
    };
};
