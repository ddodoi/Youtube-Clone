import { Channel } from "@@types/channel.type";
import { fetchChannel } from "@apis/channel.api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useChannel = () => {
    const params = useParams();
    const channelId = Number(params.channelId) || null;
    const [channel, setChannel] = useState<Channel>({
        bannerLocation: "",
        description: "",
        name: "",
        profileLocation: "",
        subscribers: 0,
        videoCount: 0,
        email: "",
        channelId,
    });
    console.log(channelId);

    useEffect(() => {
        if (!channelId) {
            return window.alert("channelId path parameter가 필요함니다.");
        }
        fetchChannel({ channelId }).then((channel: Channel) => {
            setChannel({ ...channel });
        });
    }, [channelId]);

    return { channel };
};
