export interface Video {
    videopostId: number;
    videopostName: string; // 동영상 제목
    thumbnailLocation: string;
    videoLocation: string;
    views: number;
    createAt: string; // 2020-05-06T15:41:24.000Z (ISO)
    channelId: number;
    name: string; // 채널명
    runningTime: number; // 43.21 (초)
}

export interface Meta {
    hasNextPage: boolean;
    currentPage: number;
}

// API 응답 타입
export interface VideosResponse {
    videos: Video[];
    meta: Meta;
}

export interface VideoUpload {
    runningTime: string;
    postName: string;
    description?: string;
}

export interface PlayerState {
    isPlaying: boolean;
    isTheaterMode: boolean;
    isFullscreen: boolean;
    volume: number;
    isMuted: boolean;
    currentTime: number;
    duration: number;
}

// 비디오 API 응답 타입
// export interface VideoResponse {
//     items: Video[];
//     nextPageToken?: string;
// }
