import { Video } from './mainPage.types';

export interface VideoGridProps {
    videos: Video[];
    onVideoClick?: (video: Video) => void;
    size?: 'small' | 'medium' | 'large';
}