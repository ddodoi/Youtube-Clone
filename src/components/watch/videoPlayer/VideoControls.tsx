import styled from 'styled-components';
import { useState } from 'react';
import { IoPlaySharp, IoPause, IoPlaySkipForward } from 'react-icons/io5';
import { IoMdVolumeHigh, IoMdVolumeMute } from 'react-icons/io';
import { BiCog } from 'react-icons/bi';
import { RiPlayList2Fill } from 'react-icons/ri';
import { TbRectangle } from 'react-icons/tb';
import { MdFullscreen, MdClosedCaption, MdCast, MdSubtitles } from 'react-icons/md';
import { FaRegKeyboard } from 'react-icons/fa';
import {
    ControlsContainer,
    Controls,
    LeftControls,
    RightControls,
    ControlButton,
    ProgressBar,
    Progress,
    VolumeControl,
    VolumeSlider,
    TimeDisplay,
    SettingsMenu,
} from './styles';
import { formatTime } from '../../../utils/format';
import KeyboardShortcutsModal from './KeyboardShortcutsModal';

interface VideoControlsProps {
    currentTime: number;
    duration: number;
    isPlaying: boolean;
    isMuted: boolean;
    volume: number;
    playbackSpeed: number;
    quality: string;
    isAutoplayEnabled: boolean;
    onPlay: () => void;
    onPause: () => void;
    onSeek: (time: number) => void;
    onVolumeChange: (volume: number) => void;
    onMute: () => void;
    onPlaybackSpeedChange: (speed: number) => void;
    onQualityChange: (quality: string) => void;
    onAutoplayToggle: () => void;
    onFullScreen: () => void;
    onMiniPlayerMode: () => void;
    onCastClick: () => void;
}

const VideoControls = ({ 
    currentTime, 
    duration, 
    isPlaying, 
    isMuted, 
    volume,
    playbackSpeed,
    quality,
    isAutoplayEnabled,

    onPlay,
    onPause,
    onSeek,
    onVolumeChange,
    onMute,
    onPlaybackSpeedChange,
    onQualityChange,
    onAutoplayToggle,

    onFullScreen,
    onMiniPlayerMode,
    onCastClick,
}: VideoControlsProps) => {
    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        onSeek(pos * duration);
    };

    const [showSettings, setShowSettings] = useState(false);
    const [showSubtitles, setShowSubtitles] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [previewTime, setPreviewTime] = useState(0);
    const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

    const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        setPreviewTime(pos * duration);
    };

    return (
        <>
            <ControlsContainer 
                $isHovering={isHovering}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <ProgressBar 
                    onClick={handleSeek} 
                    onMouseMove={handleProgressHover}
                >
                    <PreviewBar>
                        <PreviewThumbnail />
                        <PreviewTime>{formatTime(previewTime)}</PreviewTime>
                    </PreviewBar>
                    <Progress 
                        value={duration ? (currentTime / duration) * 100 : 0} 
                    />
                </ProgressBar>
                <Controls>
                    <LeftControls>
                        <ControlButton onClick={isPlaying ? onPause : onPlay}>
                            {isPlaying ? <IoPause size={20} /> : <IoPlaySharp size={20} />}
                        </ControlButton>
                        <ControlButton>
                            <IoPlaySkipForward size={20} />
                        </ControlButton>
                        <VolumeControl>
                            <ControlButton onClick={onMute}>
                                {isMuted ? <IoMdVolumeMute size={20} /> : <IoMdVolumeHigh size={20} />}
                            </ControlButton>
                            <VolumeSlider 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={volume}
                                onChange={(e) => onVolumeChange(Number(e.target.value))}
                            />
                        </VolumeControl>
                        <TimeDisplay>
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </TimeDisplay>
                    </LeftControls>
                    <RightControls>
                        <ControlButton onClick={() => setShowSubtitles(!showSubtitles)}>
                            <MdClosedCaption size={20} />
                        </ControlButton>
                        <ControlButton onClick={onCastClick}>
                            <MdCast size={20} />
                        </ControlButton>
                        <ControlButton onClick={() => setShowSettings(!showSettings)}>
                            <BiCog size={20} />
                        </ControlButton>
                        <ControlButton>
                            <RiPlayList2Fill size={20} />
                        </ControlButton>
                        <ControlButton onClick={onMiniPlayerMode}>
                            <TbRectangle size={20} />
                        </ControlButton>
                        <ControlButton onClick={onFullScreen}>
                            <MdFullscreen size={20} />
                        </ControlButton>
                    </RightControls>
                </Controls>
                
                {showSettings && (
                    <SettingsMenu>
                        <SettingsMenu>
                            <span>재생 속도</span>
                            <select 
                                value={playbackSpeed} 
                                onChange={(e) => onPlaybackSpeedChange(Number(e.target.value))}
                                title="재생 속도 선택"
                            >
                                <option value="0.25">0.25x</option>
                                <option value="0.5">0.5x</option>
                                <option value="0.75">0.75x</option>
                                <option value="1">일반</option>
                                <option value="1.25">1.25x</option>
                                <option value="1.5">1.5x</option>
                                <option value="1.75">1.75x</option>
                                <option value="2">2x</option>
                            </select>
                        </SettingsMenu>
                        <SettingsMenu>
                            <span>화질</span>
                            <select 
                                value={quality} 
                                onChange={(e) => onQualityChange(e.target.value)}
                                title="화질 선택"
                            >
                                <option value="auto">자동</option>
                                <option value="1080p">1080p</option>
                                <option value="720p">720p</option>
                                <option value="480p">480p</option>
                                <option value="360p">360p</option>
                            </select>
                        </SettingsMenu>
                        <SettingsMenu>
                            <span>자동 재생</span>
                            <input 
                                type="checkbox" 
                                checked={isAutoplayEnabled}
                                onChange={onAutoplayToggle}
                                title="자동 재생 설정"
                            />
                        </SettingsMenu>
                        <KeyboardShortcuts 
                            onClick={() => setShowKeyboardShortcuts(true)}
                        >
                            <FaRegKeyboard size={16} />
                            <span>키보드 단축키</span>
                        </KeyboardShortcuts>
                    </SettingsMenu>
                )}
                
                {showSubtitles && (
                    <MdSubtitles>
                        {/* 자막 설정 메뉴 */}
                    </MdSubtitles>
                )}
            </ControlsContainer>

            <KeyboardShortcutsModal 
                isOpen={showKeyboardShortcuts}
                onClose={() => setShowKeyboardShortcuts(false)}
            />
        </>
    );
};

const PreviewBar = styled.div`
    position: absolute;
    top: -80px;
    display: none;
    
    ${ProgressBar}:hover & {
        display: block;
    }
`;

const PreviewThumbnail = styled.div`
    width: 160px;
    height: 90px;
    background: #000;
`;

const PreviewTime = styled.div`
    text-align: center;
    color: white;
    font-size: 12px;
`;

const KeyboardShortcuts = styled(SettingsMenu)`
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    margin-top: 8px;
    gap: 8px;
`;

export default VideoControls;