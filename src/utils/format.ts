// 조회수 포맷팅 함수
export const formatVideoCount = (views: number): string => {
    if (!views && views !== 0) return '0 views';
    
    if (views >= 1_000_000) {
        const millions = (views / 1_000_000).toFixed(1);
        return `${millions}M views`;
    }
    
    if (views >= 1_000) {
        const thousands = (views / 1_000).toFixed(1);
        return `${thousands}K views`;
    }
    
    return `${views} views`;
};
  
// 날짜 포맷팅 함수
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    // 1분 미만
    if (diffInSeconds < 60) {
        return "방금 전";
    }
  
    // 1시간 미만
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
    }
  
    // 24시간 미만
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
    }
  
    // 7일 미만
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays}일 전`;
    }
  
    // 4주 미만
    if (diffInDays < 28) {
        const diffInWeeks = Math.floor(diffInDays / 7);
        return `${diffInWeeks}주 전`;
    }
  
    // 12개월 미만
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths}개월 전`;
    }
  
    // 1년 이상
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears}년 전`;
};
  
// 시간 포맷팅 함수 (영상 길이)
export const formatDuration = (seconds: number): string => {
    if (!seconds) return '0:00';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
  
// 숫자 포맷팅 함수 (구독자 수 등)
export const formatNumber = (num: number): string => {
    if (!num && num !== 0) return '0';
    
    if (num >= 1_000_000) {
        const millions = (num / 1_000_000).toFixed(1);
        return `${millions}M`;
    }
    
    if (num >= 1_000) {
        const thousands = (num / 1_000).toFixed(1);
        return `${thousands}K`;
    }
    
    return num.toString();
};