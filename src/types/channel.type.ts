export interface Channel {
    name: string;
    description: string;
    profileLocation: string;
    bannerLocation: string;
}

export interface VideoPost {
    videopostId: string;
    videopostName: string; // 동영상 제목
    channelId: string;
    name: string; // 채널명
    thumbnailLocation: string;
    videoLocation: string;
    views: string;
    createAt: string; // 2020-05-06T15:41:24.000Z (ISO)
    runningTime: string; // 43.21 (초)
}

export interface ChannelVideoResponse {
    channel: Channel;
    videoCount: string;
    subscribers: string;
    userVideoposts: VideoPost[];
}
