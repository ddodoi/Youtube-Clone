import { Channel } from "@@types/channel.type";
import { fetchChannel } from "@apis/channel.api";
import { useEffect, useState } from "react";

export const useChannel = ({ channelId }: { channelId?: number }) => {
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

    useEffect(() => {
        if (!channelId) return;
        fetchChannel({ channelId }).then((channel: Channel) => {
            setChannel({ ...channel });
        });
    }, [channelId]);

    return { channel };
};
