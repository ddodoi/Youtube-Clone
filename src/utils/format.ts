export const formatVideoCount = (views: number): string => {
    if (!views && views !== 0) return "0회";

    if (views >= 100000000) {
        // 1억 이상
        const billions = Math.floor(views / 100000000);
        return `${billions}억회`;
    }

    if (views >= 10000) {
        // 1만 이상
        const tenThousands = Math.floor(views / 10000);
        return `${tenThousands}만회`;
    }

    if (views >= 1000) {
        // 1천 이상
        const thousands = Math.floor(views / 1000);
        return `${thousands}천회`;
    }

    return `${views}회`;
};

// 날짜 포맷팅 함수
export const formatDate = (dateString: string): string => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // 유효하지 않은 날짜면 빈 문자열 반환

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
    if (isNaN(diffInYears)) return ""; // 계산 결과가 NaN이면 빈 문자열 반환
    return `${diffInYears}년 전`;
};

// 시간 포맷팅 함수 (영상 길이)
export const formatDuration = (seconds: number): string => {
    if (!seconds) return "0:00";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

// 숫자 포맷팅 함수 (구독자 수 등)
export const formatNumber = (num: number): string => {
    if (!num && num !== 0) return "0";

    if (num >= 100000000) {
        // 1억 이상
        const billions = (num / 100000000).toFixed(1);
        return `${billions}억`;
    }

    if (num >= 10000) {
        // 1만 이상
        const tenThousands = (num / 10000).toFixed(1);
        return `${tenThousands}만`;
    }

    if (num >= 1000) {
        // 1천 이상
        const thousands = (num / 1000).toFixed(1);
        return `${thousands}천`;
    }

    return num.toString();
};

export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const formatNumberComma = (num: string | number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
