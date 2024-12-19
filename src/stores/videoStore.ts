import { create } from "zustand";

type StoreState = {
    videoFile: File | null;
    videoURL: string;
    setVideoFile: (videoFile: File) => void;
};

export const useVideoStore = create<StoreState>()((set) => ({
    videoFile: null,
    videoURL: "",
    setVideoFile: (videoFile) => {
        set(() => ({ videoFile, videoURL: URL.createObjectURL(videoFile) }));
    },
}));
