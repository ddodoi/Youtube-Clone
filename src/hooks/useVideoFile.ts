import { useVideoStore } from "@stores/videoStore";
import { ChangeEvent, useMemo } from "react";

export const useVideoFile = () => {
    const { videoFile, thumbnailFile, setVideoFile, setThumbnailFile } = useVideoStore();
    const videoURL = useMemo(() => (videoFile ? URL.createObjectURL(videoFile) : ""), [videoFile]);
    const videoTitle = useMemo(() => (videoFile ? videoFile.name : ""), [videoFile]);
    const thumbnailURL = useMemo(
        () => (thumbnailFile ? URL.createObjectURL(thumbnailFile) : ""),
        [thumbnailFile],
    );

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

    const handleThumbnailUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log(file instanceof File);
            if (file.type.startsWith("image/")) {
                setThumbnailFile(file);
            } else {
                window.alert("이미지 형식 파일이 아닙니다.");
            }
        }
    };

    return {
        videoFile,
        videoURL,
        videoTitle,
        thumbnailFile,
        thumbnailURL,
        setVideoFile,
        handleVideoUpload,
        handleThumbnailUpload,
        setThumbnailFile,
    };
};
