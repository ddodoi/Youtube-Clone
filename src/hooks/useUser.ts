import { useEffect, useState } from "react";
import { fetchUserInfo } from "../apis/user.api";
import { UserInfoResponse } from "../mock/user.mock";

export const useUser = () => {
    const [user, setUser] = useState<UserInfoResponse>({
        avatarURL: "",
        name: "",
    });

    useEffect(() => {
        fetchUserInfo().then(({ avatarURL, name }: UserInfoResponse) => {
            setUser({ avatarURL, name });
        });
    }, []);

    return { user };
};
