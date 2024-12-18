//비디오 정보 타입
export interface Video{
    id: string;
    title: string;
    channel:string;
    thumbnailUrl: string;
    viewCount: number;
    createdAt: string; 
    duration: string;
}

// 채널 정보 타입
export interface channel {
    id: string;
    name: string;
    profileImageUrl: string;
    subscriberCount: string;
    videoCount: string;
    customUrl?: string;
    totalView?: number;
    joinDate?: string;
    country?: string;
    description?: string;
    email?: string;
}

// API 응답 타입
export interface VideoListResponse {
    success: boolean; // 요청 성공 여부
    data?: Video[];   // 성공 시 반환되는 비디오 목록 (배열)
    error?: string;   // 실패 시 에러 메시지
}