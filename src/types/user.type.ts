export interface LoginResponse {
    token: string;
}

export interface UserInfoResponse {
    email: string;
    name: string;
    profileLocation: string;
}

export interface SubscriptionResponse {
    name: string;
    channelId: string;
    profileLocation: string;
}
