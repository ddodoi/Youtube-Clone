import { Video } from "@@types/video.type";
import { fetchVideo } from "@apis/videos.api";
import { useEffect, useState } from "react";

export const useVideo = ({ videoId }: { videoId: number }) => {
    const [video, setVideo] = useState<Video | null>(null);

    useEffect(() => {
        fetchVideo({ videopostId: videoId }).then((video: Video) => {
            setVideo(video);
        });
    }, []);

    return { video };
};
