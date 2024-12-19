import { Video } from "@@types/video.type"; 

export interface VideoCardProps {
    video: Video & { 
        previewUrl?: string; 
    };
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    size?: 'small' | 'medium' | 'large';
}
