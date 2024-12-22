import { useEffect, useState } from "react";
import { fetchUserInfo } from "@apis/user.api";
import { Channel } from "@@types/channel.type";

export const useUser = () => {
    const [user, setUser] = useState<Channel>({
        bannerLocation: "",
        description: "",
        name: "",
        profileLocation: "",
        subscribers: 0,
        videoCount: 0,
        email: "",
        channelId: null,
    });

    useEffect(() => {
        fetchUserInfo().then((channel: Channel) => {
            setUser({ ...channel });
        });
    }, []);

    return { user };
};
