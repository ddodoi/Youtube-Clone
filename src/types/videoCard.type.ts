import { Video } from "./mainPage.types";

export interface VideoCardProps {
    video: Video;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    size?: "small" | "medium" | "large";
}
