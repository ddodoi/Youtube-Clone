import axios from 'axios';
import { Comment, CreateCommentDto, CommentResponse } from '../types/comment.type';

// 실제 백엔드 API URL로 변경 필요
const BASE_URL = 'http://localhost:8080/api/comments';

export const getComments = async (videoId: string, page = 1): Promise<CommentResponse> => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: { videoId, page }
        });
        return response.data;
    } catch (error) {
        console.error('댓글 조회 실패:', error);
        throw error;
    }
};

export const createComment = async (data: CreateCommentDto): Promise<Comment> => {
    try {
        const response = await axios.post(`${BASE_URL}`, data);
        return response.data;
    } catch (error) {
        console.error('댓글 작성 실패:', error);
        throw error;
    }
};

export const updateComment = async (commentId: string, content: string): Promise<Comment> => {
    try {
        const response = await axios.patch(`${BASE_URL}/${commentId}`, { content });
        return response.data;
    } catch (error) {
        console.error('댓글 수정 실패:', error);
        throw error;
    }
};

export const deleteComment = async (commentId: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${commentId}`);
    } catch (error) {
        console.error('댓글 삭제 실패:', error);
        throw error;
    }
};

export const likeComment = async (commentId: string): Promise<Comment> => {
    try {
        const response = await axios.post(`${BASE_URL}/${commentId}/like`);
        return response.data;
    } catch (error) {
        console.error('댓글 좋아요/싫어요 실패:', error);
        throw error;
    }
}; 