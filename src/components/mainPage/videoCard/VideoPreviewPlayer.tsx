import { useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import { MdVolumeOff, MdVolumeUp, MdSubtitles } from "react-icons/md";

interface VideoMetadata {
    isHovered: boolean;
    isMuted: boolean;
    showCaptions: boolean;
    isLoading: boolean;
}

interface VideoPreviewPlayerProps {
    thumbnailUrl: string;
    previewUrl?: string;
    metadata: VideoMetadata;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onToggleMute: (e: React.MouseEvent) => void;
    onToggleCaptions: (e: React.MouseEvent) => void;
    duration?: string;
}

const VideoPreviewPlayer = memo(({
    thumbnailUrl,
    previewUrl,
    metadata,
    onMouseEnter,
    onMouseLeave,
    onToggleMute,
    onToggleCaptions,
    duration
}: VideoPreviewPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const previewTimeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (metadata.isHovered && videoRef.current && previewUrl) {
            previewTimeoutRef.current = setTimeout(() => {
                videoRef.current?.play();
            }, 300);
        }

        return () => {
            if (previewTimeoutRef.current) {
                clearTimeout(previewTimeoutRef.current);
            }
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        };
    }, [metadata.isHovered, previewUrl]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = metadata.isMuted;
        }
    }, [metadata.isMuted]);

    return (
        <Container
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {metadata.isHovered && previewUrl ? (
                <>
                    <Video
                        ref={videoRef}
                        src={previewUrl}
                        muted={metadata.isMuted}
                        loop
                        playsInline
                    >
                        {metadata.showCaptions && (
                            <track 
                                kind="captions" 
                                src="/captions/ko.vtt" 
                                srcLang="ko" 
                                label="한국어" 
                                default 
                            />
                        )}
                    </Video>
                    {metadata.isLoading && <LoadingOverlay />}
                    <Controls>
                        <ControlButton
                            onClick={onToggleMute}
                            aria-label={metadata.isMuted ? "음소거 해제" : "음소거"}
                            title={metadata.isMuted ? "음소거 해제" : "음소거"}
                        >
                            {metadata.isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                        </ControlButton>
                        <ControlButton
                            onClick={onToggleCaptions}
                            aria-label={metadata.showCaptions ? "자막 끄기" : "자막 켜기"}
                            title={metadata.showCaptions ? "자막 끄기" : "자막 켜기"}
                            $active={metadata.showCaptions}
                        >
                            <MdSubtitles />
                        </ControlButton>
                    </Controls>
                </>
            ) : (
                <Thumbnail src={thumbnailUrl} alt="" loading="lazy" />
            )}
            {duration && <DurationBadge>{duration}</DurationBadge>}
        </Container>
    );
});

VideoPreviewPlayer.displayName = 'VideoPreviewPlayer';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: #f1f1f1;
    overflow: hidden;
    border-radius: 12px;
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const LoadingOverlay = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
`;

const Controls = styled.div`
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ControlButton = styled.button<{ $active?: boolean }>`
    background: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${(props) => (props.$active ? '#1c62b9' : 'white')};
    transition: all 0.2s;

    &:hover {
        background: rgba(0, 0, 0, 0.8);
    }

    svg {
        width: 24px;
        height: 24px;
    }
`;

const DurationBadge = styled.div`
    position: absolute;
    bottom: 8px;
    right: 8px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 3px 4px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
`;

export default VideoPreviewPlayer;