import { createTRPCRouter } from './trpc';
import { exampleRouter } from './routers/example';
import { messageRouter } from './routers/message';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  message: messageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
