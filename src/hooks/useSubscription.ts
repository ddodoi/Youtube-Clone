import { useEffect, useState } from "react";
import { fetchSubInfo } from "@apis/user.api";
import { SubscriptionResponse } from "@@types/user.type";

export const useSubscription = () => {
    const [subscriptions, setSubscriptions] = useState<SubscriptionResponse[]>([]);
    const [moreSubscriptions, setMoreSubscriptions] = useState<SubscriptionResponse[]>([]);

    useEffect(() => {
        fetchSubInfo()
            .then((res) => {
                if (Array.isArray(res)) {
                    setSubscriptions(res.slice(0, 7));
                    setMoreSubscriptions(res.slice(7));
                } else {
                    setSubscriptions([]);
                    setMoreSubscriptions([]);
                }
            })
            .catch((error) => {
                console.error(error);
                setSubscriptions([]);
                setMoreSubscriptions([]);
            });
    }, []);

    return { subscriptions, moreSubscriptions };
};
