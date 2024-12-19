import { create } from "zustand";

type StoreState = {
    videoFile: File | null;
    setVideoFile: (videoFile: File | null) => void;
};

export const useVideoStore = create<StoreState>()((set) => ({
    videoFile: null,
    setVideoFile: (videoFile) => {
        set(() => ({ videoFile }));
    },
}));
