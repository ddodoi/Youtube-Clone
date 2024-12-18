import { Video } from '../../../types/video';

export interface VideoGridProps {
    videos: Video[];
    onVideoClick?: (video: Video) => void;
    size?: 'small' | 'medium' | 'large';
}