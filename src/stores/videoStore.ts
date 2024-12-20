import { create } from "zustand";

type StoreState = {
    videoFile: File | null;
    thumbnailFile: File | null;
    setVideoFile: (videoFile: File | null) => void;
    setThumbnailFile: (thumbnailFile: File | null) => void;
};

export const useVideoStore = create<StoreState>()((set) => ({
    videoFile: null,
    thumbnailFile: null,
    setVideoFile: (videoFile) => {
        set(() => ({ videoFile }));
    },
    setThumbnailFile: (thumbnailFile) => {
        set(() => ({ thumbnailFile }));
    },
}));
