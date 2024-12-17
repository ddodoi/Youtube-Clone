import { useEffect, useState } from "react";
import { fetchUserInfo } from "../apis/user.api";
import { UserInfoResponse } from "../mock/user.mock";

export const useUser = () => {
    const [user, setUser] = useState<UserInfoResponse>({
        profileImageURL: "",
        name: "",
    });

    useEffect(() => {
        fetchUserInfo().then(({ profileImageURL, name }: UserInfoResponse) => {
            setUser({ profileImageURL, name });
        });
    }, []);

    return { user };
};
