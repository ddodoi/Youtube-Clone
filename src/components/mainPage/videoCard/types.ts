import { Video } from "../../../types/video"; // Video 타입 불러오기

export interface VideoCardProps {
    video: Video & { 
        previewUrl?: string; // 선택적 속성: 비디오 미리보기 URL
    };
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    size?: 'small' | 'medium' | 'large';
}
