import { Video } from "../../../types/video";

export interface VideoCardProps {
    video: Video;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    size?: 'small' | 'medium' | 'large';
}