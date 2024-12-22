import { useEffect, useState } from "react";
import { fetchUserInfo } from "@apis/user.api";
import { Channel } from "@@types/channel.type";

export const useUser = () => {
    const [user, setUser] = useState<Channel | null>(null);

    useEffect(() => {
        fetchUserInfo().then((channel: Channel) => {
            setUser({ ...channel });
        });
    }, []);

    return { user };
};
