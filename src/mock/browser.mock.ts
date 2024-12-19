import { HttpHandler } from "msw";
import { setupWorker } from "msw/browser";
import { authHandlers } from "./user.mock";
import { videoHandlers } from "./video.mock";

const handlers: HttpHandler[] = [...authHandlers, ...videoHandlers];

export const worker = setupWorker(...handlers);
