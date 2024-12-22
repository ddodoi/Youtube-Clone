export interface Channel {
    name: string;
    description: string;
    profileLocation: string;
    bannerLocation: string;
    videoCount: number;
    subscribers: number;
    email: string;
    channelId?: number | null;
}
