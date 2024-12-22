import { useState } from "react";
import { useComments } from "@hooks/useComments";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import styled from "styled-components";
import { Comment } from "../../../types/comment.type";

interface CommentsProps {
    videoId: number;
}

const Comments = ({ videoId }: CommentsProps) => {
    // 임시 댓글 데이터 상태
    const [localComments, setLocalComments] = useState<Comment[]>([]);
    useComments(videoId);

    const handleSubmitComment = (content: string, parentId?: string) => {
        if (!content.trim()) return;

        const newComment: Comment = {
            id: Date.now().toString(),
            content,
            author: {
                id: "user1",
                name: "사용자",
                avatar: "https://via.placeholder.com/40",
            },
            likes: 0,
            createdAt: new Date().toISOString(),
            replies: [],
        };

        if (parentId) {
            // 대댓글인 경우
            setLocalComments((prev) =>
                prev.map((comment) => {
                    if (comment.id === parentId) {
                        return {
                            ...comment,
                            replies: [...(comment.replies || []), newComment],
                        };
                    }
                    return comment;
                }),
            );
        } else {
            // 일반 댓글인 경우
            setLocalComments((prev) => [newComment, ...prev]);
        }
    };

    const handleDeleteComment = (commentId: string, parentId?: string) => {
        if (parentId) {
            // 대댓글 삭제
            setLocalComments((prev) =>
                prev.map((comment) => {
                    if (comment.id === parentId) {
                        return {
                            ...comment,
                            replies: comment.replies?.filter((reply) => reply.id !== commentId),
                        };
                    }
                    return comment;
                }),
            );
        } else {
            // 일반 댓글 삭제
            setLocalComments((prev) => prev.filter((comment) => comment.id !== commentId));
        }
    };

    return (
        <Container>
            <Header>
                <CommentCount>댓글 {(localComments.length || 0).toLocaleString()}개</CommentCount>
            </Header>
            <CommentInput onSubmit={handleSubmitComment} />
            <CommentList>
                {localComments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        {...comment}
                        onReply={(content) => handleSubmitComment(content, comment.id)}
                        onDelete={handleDeleteComment}
                        currentUserId="user1"
                    />
                ))}
            </CommentList>
        </Container>
    );
};

const Container = styled.div`
    width: 900px;
    margin: 24px auto;

    @media (max-width: 1200px) {
        width: 800px;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
    margin-bottom: 24px;
    position: relative;
`;

const CommentCount = styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme?.colors?.text?.primary || "#030303"};
`;

const CommentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export default Comments;
