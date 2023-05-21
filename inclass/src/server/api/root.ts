import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { classRouter } from "./routers/class";
import { questionRouter } from "./routers/question";
import { replyRouter } from "./routers/reply";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  class: classRouter,
  question: questionRouter,
  reply: replyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
