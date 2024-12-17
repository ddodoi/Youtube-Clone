import { HttpHandler } from "msw";
import { setupWorker } from "msw/browser";
import { authHandlers } from "./user.mock";

const handlers: HttpHandler[] = [...authHandlers];

export const worker = setupWorker(...handlers);
