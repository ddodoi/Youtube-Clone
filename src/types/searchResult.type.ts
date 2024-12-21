// 비디오 미리보기 타입
export interface VideoPreview {
    video:{
        videopostId: string;
        videopostName: string;
        name: string;
        thumbnailLocation: string;
        videoLocation?: string;
        views: number;
        createdAt: string;
        duration: string;
        channelId?: string;
        description?: string
    }
}