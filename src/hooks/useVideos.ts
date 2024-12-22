import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchKeywordVideos, fetchVideos } from "../apis/videos.api";
import { Video } from "@@types/video.type";
import { useParams, useSearchParams } from "react-router-dom";

export const useVideos = (limit: number = 20) => {
    const params = useParams();
    const channelId = Number(params.channelId) || undefined;
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search_query") || ""; // 검색어 가져오기

    const getKeywordVideos = ({ pageParam }: { pageParam: number }) => {
        return fetchKeywordVideos({
            searchQuery: searchQuery!,
            page: pageParam,
            limit,
        });
    };

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
        queryKey: ["videos", channelId, searchQuery],
        queryFn: ({ pageParam }) =>
            searchQuery ? getKeywordVideos({ pageParam }) : getVideos({ pageParam }),
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
