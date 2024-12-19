import { create } from "zustand";

type StoreState = {
    videoFile: File | null;
    videoURL: string;
    setVideoFile: (videoFile: File | null) => void;
};

export const useVideoStore = create<StoreState>()((set) => ({
    videoFile: null,
    videoURL: "",
    setVideoFile: (videoFile) => {
        set(() => ({ videoFile, videoURL: videoFile ? URL.createObjectURL(videoFile) : "" }));
    },
}));
