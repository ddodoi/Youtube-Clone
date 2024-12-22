import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getComments,
    createComment,
    updateComment,
    deleteComment,
    likeComment,
} from "../apis/comment.api";
import { CreateCommentDto } from "../types/comment.type";

export const useComments = (videoId: number) => {
    const queryClient = useQueryClient();

    // 댓글 목록 조회
    const { data, isLoading, error } = useQuery({
        queryKey: ["comments", videoId],
        queryFn: () => getComments(videoId),
    });

    // 댓글 작성
    const createMutation = useMutation({
        mutationFn: (newComment: CreateCommentDto) => createComment(newComment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", videoId] });
        },
    });

    // 댓글 수정
    const updateMutation = useMutation({
        mutationFn: ({ commentId, content }: { commentId: string; content: string }) =>
            updateComment(commentId, content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", videoId] });
        },
    });

    // 댓글 삭제
    const deleteMutation = useMutation({
        mutationFn: (commentId: string) => deleteComment(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", videoId] });
        },
    });

    // 댓글 좋아요
    const likeMutation = useMutation({
        mutationFn: (commentId: string) => likeComment(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", videoId] });
        },
    });

    return {
        comments: data?.data || [],
        totalComments: data?.meta.total || 0,
        isLoading,
        error,
        createComment: createMutation.mutate,
        updateComment: updateMutation.mutate,
        deleteComment: deleteMutation.mutate,
        likeComment: likeMutation.mutate,
    };
};
