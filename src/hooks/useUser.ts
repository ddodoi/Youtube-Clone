import { useEffect, useState } from "react";
import { fetchUserInfo } from "@apis/user.api";
import { UserInfoResponse } from "@@types/user.type";

export const useUser = () => {
    const [user, setUser] = useState<UserInfoResponse>({
        profileLocation: "",
        name: "",
        email: "",
    });

    useEffect(() => {
        fetchUserInfo().then(({ profileLocation, name, email }: UserInfoResponse) => {
            setUser({ profileLocation, name, email });
        });
    }, []);

    return { user };
};
