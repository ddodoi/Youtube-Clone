import { HttpHandler } from "msw";
import { setupWorker } from "msw/browser";

const handlers: HttpHandler[] = [];

export const worker = setupWorker(...handlers);
