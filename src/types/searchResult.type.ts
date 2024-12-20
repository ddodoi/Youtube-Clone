// 비디오 미리보기 타입
export interface VideoPreview {
    video:{
        id: string;
        title: string;
        channel: string;
        thumbnailUrl: string;
        previewUrl?: string;
        viewCount: number;
        createdAt: string;
        duration: string;
        channelId?: string;
        description: string
    }
}