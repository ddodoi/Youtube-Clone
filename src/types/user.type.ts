export interface LoginResponse {
    token: string;
}

export interface UserInfoResponse {
    name: string;
    profileImageURL: string;
}

export interface SubscriptionResponse {
    channelName: string;
    channelEmail: string;
    profileImageURL: string;
}
