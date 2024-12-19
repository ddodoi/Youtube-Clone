import { Video } from "@@types/video.type";

export interface VideoCardProps {
    video: Video;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    size?: 'small' | 'medium' | 'large';
    isLoading?: boolean;
}