export interface Channel {
    name: string;
    description: string;
    profileLocation: string;
    bannerLocation: string;
}

export interface VideoPost {
    videopostId: number;
    videopostName: string; // 동영상 제목
    channelId: number;
    name: string; // 채널명
    thumbnailLocation: string;
    videoLocation: string;
    views: number;
    createAt: string; // 2020-05-06T15:41:24.000Z (ISO)
    runningTime: number; // 43.21 (초)
}

export interface ChannelVideoResponse {
    channel: Channel;
    videoCount: number;
    subscribers: number;
    userVideoposts: VideoPost[];
    meta: Meta;
}

export interface Meta {
    hasNextPage: boolean;
    currentPage: number;
}
