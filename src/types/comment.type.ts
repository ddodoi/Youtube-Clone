export interface Comment {
    id: string;
    content: string;
    author: {
        id: string;
        name: string;
        avatar: string;
    };
    likes: number;
    createdAt: string;
    replies?: Comment[];
}

export interface CreateCommentDto {
    videoId: string;
    content: string;
    parentId?: string;  
}

export interface CommentResponse {
    success: boolean;
    data: Comment[];
    meta: {
        total: number;
        currentPage: number;
        hasNextPage: boolean;
    };
} 