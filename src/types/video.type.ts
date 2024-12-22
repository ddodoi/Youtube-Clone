//비디오 정보 타입
export interface Channel {
    id: string;
    title: string;
    thumbnail: string;
}

export interface Video {
    likes: number;
    channelThumbnailURL: any;
    id: any;
    videopostId: string;
    videopostName: string;
    description: string;
    thumbnailLocation: string;
    videoLocation: string;
    views: number;
    createAt: string;
    channelId: string;
    channelTitle: string;
    name: string;
    profileLocation: string;
    runningTime: string;
    previewURL?: string;
}

// 채널 정보 타입
export interface channel {
    id: string;
    name: string;
    profileImageURL: string;
    subscriberCount: string;
    videoCount: string;
    customURL?: string;
    totalView?: number;
    joinDate?: string;
    country?: string;
    description?: string;
    email?: string;
    channelThumbnailURL?: string;
    channelTitle?: string;
}

export interface PaginationMeta {
    currentPage: number;
    totalPage: number;
    hasNextPage: boolean;
}

// API 응답 타입
export interface VideoListResponse {
    success: boolean;
    data?: Video[];
    meta?: PaginationMeta;
    error?: string;
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
export interface VideoResponse {
    items: Video[];
    nextPageToken?: string;
}

// VideoCard 컴포넌트용 타입
export interface VideoCardProps {
    video?: Video;
    handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    size?: 'small' | 'medium' | 'large';
    layout?: 'vertical' | 'horizontal';
    isLoading?: boolean;
}