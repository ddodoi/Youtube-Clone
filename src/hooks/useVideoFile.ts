import { VideoUpload } from "@@types/video.type";
import { createVideo } from "@apis/videos.api";
import { useVideoStore } from "@stores/videoStore";
import { ChangeEvent, FormEvent, useMemo } from "react";
import { FORMDATA } from "../constants/formData";

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
            if (file.type.startsWith("image/")) {
                setThumbnailFile(file);
            } else {
                window.alert("이미지 형식 파일이 아닙니다.");
            }
        }
    };

    const handleSendFile = (
        e: FormEvent,
        { description = "", postName, runningTime }: VideoUpload,
    ) => {
        e.preventDefault();
        if (!videoFile || !thumbnailFile) {
            window.alert("비디오 파일과 썸네일을 모두 업로드해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append(FORMDATA.VIDEO_FILE, videoFile, videoFile.name);
        formData.append(FORMDATA.THUMBNAIL_FILE, thumbnailFile, thumbnailFile.name);
        formData.append(FORMDATA.POST_NAME, postName);
        formData.append(FORMDATA.DESCRIPTION, description);
        formData.append(FORMDATA.RUNNING_TIME, runningTime);

        createVideo(formData).then((res) => {
            window.alert("성공적으로 업로드되었습니다.");
            console.log(res);
            setVideoFile(null);
            setThumbnailFile(null);
        });
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
        handleSendFile,
    };
};
