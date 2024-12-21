import { HttpHandler } from "msw";
import { setupWorker } from "msw/browser";
import { authHandlers } from "./user.mock";
import { videoHandlers } from "./video.mock";
import { channelHandlers } from "./channel.mock";

const handlers: HttpHandler[] = [...authHandlers, ...videoHandlers, ...channelHandlers];

export const worker = setupWorker(...handlers);
