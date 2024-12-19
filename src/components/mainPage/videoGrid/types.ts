import { Video } from '../../../types/video.type';

export interface VideoGridProps {
    videos: Video[];
    onVideoClick?: (video: Video) => void;
    size?: 'small' | 'medium' | 'large';
}