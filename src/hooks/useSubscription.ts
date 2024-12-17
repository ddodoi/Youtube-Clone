import { useEffect, useState } from "react";
import { fetchSubInfo } from "@apis/user.api";
import { SubscriptionResponse } from "@@types/user.type";

export const useSubscription = () => {
    const [subscriptions, setSubscriptions] = useState<SubscriptionResponse[]>([]);
    const [moreSubscriptions, setMoreSubscriptions] = useState<SubscriptionResponse[]>([]);

    useEffect(() => {
        fetchSubInfo().then((res: SubscriptionResponse[]) => {
            setSubscriptions(res.map((sub) => ({ ...sub })).slice(0, 7));
            setMoreSubscriptions(res.map((sub) => ({ ...sub })).slice(7));
        });
    }, []);

    return { subscriptions, moreSubscriptions };
};
