import { useEffect, useState } from "react";
import { fetchUserInfo } from "@apis/user.api";
import { UserInfoResponse } from "@@types/user.type";

export const useUser = () => {
    const [user, setUser] = useState<UserInfoResponse>({
        profileLocation: "",
        name: "",
        email: "",
        channelId: "",
    });

    useEffect(() => {
        fetchUserInfo().then(({ profileLocation, name, email, channelId }: UserInfoResponse) => {
            setUser({ profileLocation, name, email, channelId });
        });
    }, []);

    return { user };
};
