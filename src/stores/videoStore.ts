import { create } from "zustand";
import { Video, PlayerState } from "@@types/video.type";

interface VideoStore {
    currentVideo: Video | null;
    playerState: PlayerState;
    isLoading: boolean;
    error: string | null;
    videoFile: File | null;
    thumbnailFile: File | null;

    setCurrentVideo: (video: Video) => void;
    setPlayerState: (state: Partial<PlayerState>) => void;
    togglePlay: () => void;
    toggleTheaterMode: () => void;
    toggleMute: () => void;
    setVolume: (volume: number) => void;
    setError: (error: string | null) => void;
    setLoading: (loading: boolean) => void;
    setVideoFile: (videoFile: File | null) => void;
    setThumbnailFile: (thumbnailFile: File | null) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
    currentVideo: null,
    playerState: {
        isPlaying: false,
        isTheaterMode: false,
        isFullscreen: false,
        volume: 100,
        isMuted: false,
        currentTime: 0,
        duration: 0,
    },
    isLoading: false,
    error: null,
    videoFile: null,
    thumbnailFile: null,

    setCurrentVideo: (video) => set({ currentVideo: video }),
    setPlayerState: (state) => set((store) => ({
        playerState: { ...store.playerState, ...state },
    })),
    togglePlay: () => set((store) => ({
        playerState: {
            ...store.playerState,
            isPlaying: !store.playerState.isPlaying,
        },
    })),
    toggleTheaterMode: () => set((store) => ({
        playerState: {
            ...store.playerState,
            isTheaterMode: !store.playerState.isTheaterMode,
        },
    })),
    toggleMute: () => set((store) => ({
        playerState: {
            ...store.playerState,
            isMuted: !store.playerState.isMuted,
        },
    })),
    setVolume: (volume) => set((store) => ({
        playerState: { ...store.playerState, volume },
    })),
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ isLoading: loading }),
    setVideoFile: (videoFile) => set({ videoFile }),
    setThumbnailFile: (thumbnailFile) => set({ thumbnailFile }),
}));
