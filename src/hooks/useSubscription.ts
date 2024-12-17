import { useEffect, useState } from "react";
import { SubscriptionResponse } from "../mock/user.mock";
import { fetchSubInfo } from "../apis/user.api";

export const useSubscription = () => {
    const [subscriptions, setSubscriptions] = useState<SubscriptionResponse[]>([]);

    useEffect(() => {
        fetchSubInfo().then((res: SubscriptionResponse[]) => {
            setSubscriptions(res.map((sub) => ({ ...sub })));
        });
    }, []);

    return { subscriptions };
};
