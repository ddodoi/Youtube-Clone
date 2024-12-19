import { useVideoStore } from "@stores/videoStore";
import { ChangeEvent, useMemo } from "react";

export const useVideoFile = () => {
    const { videoFile, setVideoFile } = useVideoStore();
    const videoURL = useMemo(() => (videoFile ? URL.createObjectURL(videoFile) : ""), [videoFile]);
    const videoTitle = useMemo(() => (videoFile ? videoFile.name : ""), [videoFile]);

    const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type.startsWith("video/")) {
                setVideoFile(file);
            } else {
                window.alert("비디오 형식 파일이 아닙니다.");
            }
        }
    };

    return { videoFile, videoURL, videoTitle, setVideoFile, handleVideoUpload };
};
