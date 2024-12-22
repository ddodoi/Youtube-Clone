import styled from "styled-components";

export const VideoContainer = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    background: #000;
    margin-left: auto;
    margin-right: auto;
    border-radius: 12px;
    overflow: hidden;

    @media (max-width: 1200px) {
        max-width: 800px;
    }
`;

export const VideoWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    video {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

// VideoControls 스타일
export const ControlsContainer = styled.div<{ $isHovering: boolean }>`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    padding: 0 12px;
    opacity: ${(props) => (props.$isHovering ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
`;

export const Controls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
`;

export const LeftControls = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const RightControls = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const ControlButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        opacity: 0.8;
    }
`;

export const ProgressBar = styled.div`
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    position: relative;

    &:hover {
        height: 5px;
    }
`;

export const PreviewBar = styled.div`
    position: absolute;
    top: -80px;
    display: none;

    ${ProgressBar}:hover & {
        display: block;
    }
`;

export const Progress = styled.div<{ value: number }>`
    height: 100%;
    background: #ff0000;
    width: ${(props) => {
        const value = Number.isNaN(props.value) ? 0 : props.value;
        return `${value}%`;
    }};
`;

export const VolumeControl = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const VolumeSlider = styled.input`
    width: 80px;
    height: 3px;
    -webkit-appearance: none;
    background: rgba(255, 255, 255, 0.3);

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 12px;
        height: 12px;
        background: white;
        border-radius: 50%;
        cursor: pointer;
    }
`;

export const TimeDisplay = styled.div`
    color: white;
    font-size: 14px;
    margin-left: 8px;
`;

export const SettingsMenu = styled.div`
    position: absolute;
    bottom: 40px;
    right: 10px;
    background: rgba(28, 28, 28, 0.9);
    border-radius: 4px;
    padding: 8px 0;
    min-width: 250px;
    color: white;
    z-index: 100;
`;

export const PlayButton = styled.button<{ $isPlaying: boolean }>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: transparent;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    ${VideoWrapper}:hover & {
        opacity: ${(props) => (props.$isPlaying ? 0 : 0.8)};
        &::before {
            opacity: 0.1;
        }
    }

    &:hover::before {
        opacity: 0.2;
    }

    svg {
        position: relative;
        color: white;
        font-size: 40px;
        opacity: 0.9;
    }
`;

// ... 나머지 스타일 컴포넌트들
