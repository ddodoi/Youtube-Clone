import { useState, useRef, useEffect } from "react";
import VideoControls from "./VideoControls";
import { VideoContainer, VideoWrapper, PlayButton } from './styles';
import { IoPlaySharp, IoPause } from 'react-icons/io5';  // 아이콘 import
import KeyboardShortcutsModal from "./KeyboardShortcutsModal";

interface VideoPlayerProps {
    videoUrl: string;
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

    const handlePlay = () => {
        videoRef.current?.play();
        setIsPlaying(true);
    };

    const handlePause = () => {
        videoRef.current?.pause();
        setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        if (videoRef.current) {
            videoRef.current.volume = newVolume / 100;
            setVolume(newVolume);
        }
    };

    const handleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleFullScreen = () => {
        if (videoRef.current) {
            videoRef.current.requestFullscreen();
        }
    };

    useEffect(() => {
        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        };
    }, []);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement) return;  // 입력 중일 때는 무시

            switch (e.key) {
                case 'f':  // 전체화면
                    handleFullScreen();
                    break;
                case 'm':  // 음소거
                    handleMute();
                    break;
                case 'j':  // 10초 뒤로
                    handleSeek(currentTime - 10);
                    break;
                case 'l':  // 10초 앞으로
                    handleSeek(currentTime + 10);
                    break;
                case 'k':  // 재생/일시정지
                    isPlaying ? handlePause() : handlePlay();
                    break;
                case '?':  // ? 키 추가
                    setShowKeyboardShortcuts(true);
                    break;
                case 'Escape':  // ESC 키로 모달 닫기
                    setShowKeyboardShortcuts(false);
                    break;
                // ... 기존 단축키들
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [isPlaying, currentTime, volume]);

    useEffect(() => {
        // 비디오 로드 후 자동재생
        if (videoRef.current) {
            videoRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(() => console.log('자동재생이 차단되었습니다'));
        }
    }, [videoUrl]);

    return (
        <VideoContainer>
            <VideoWrapper>
                <video
                    ref={videoRef}
                    src={videoUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    playsInline
                />
                <PlayButton 
                    $isPlaying={isPlaying}
                    onClick={isPlaying ? handlePause : handlePlay}
                >
                    {isPlaying ? <IoPause size={32} /> : <IoPlaySharp size={32} />}
                </PlayButton>
                <VideoControls
                    currentTime={currentTime}
                    duration={duration}
                    isPlaying={isPlaying}
                    isMuted={isMuted}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onSeek={handleSeek}
                    onVolumeChange={handleVolumeChange}
                    onMute={handleMute}
                    onFullScreen={handleFullScreen}
                    volume={volume}
                    playbackSpeed={1}
                    quality="auto"
                    isAutoplayEnabled={false}
                    onPlaybackSpeedChange={function (speed: number): void {
                        if (videoRef.current) {
                            videoRef.current.playbackRate = speed;
                        }
                    }}
                    onQualityChange={function (quality: string): void {
                        console.log(`Quality changed to: ${quality}`);
                        // 실제 품질 변경 로직은 추후 구현
                    }}
                    onAutoplayToggle={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                    onMiniPlayerMode={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                    onCastClick={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                />
            </VideoWrapper>
            <KeyboardShortcutsModal 
                isOpen={showKeyboardShortcuts}
                onClose={() => setShowKeyboardShortcuts(false)}
            />
        </VideoContainer>
    );
};

export default VideoPlayer;
