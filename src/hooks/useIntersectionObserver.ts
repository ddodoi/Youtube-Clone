import { useEffect, useRef } from "react";

export const useIntersectionObserver = (callback: IntersectionObserverCallback) => {
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(callback);

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }
        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    });

    return targetRef;
};
