import { Video } from "./mainPage.type";

export interface VideoCardProps {
    video: Video;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    size?: "small" | "medium" | "large";
}
