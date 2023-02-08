import { createProxySSGHelpers } from '@trpc/react-query/ssg';

import superjson from 'superjson';

import { postRouter } from './routers/post';
import { createSSGContext, createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
});

export const ssgHelpers = createProxySSGHelpers({
  router: appRouter,
  transformer: superjson,
  ctx: createSSGContext(),
});

// export type definition of API
export type AppRouter = typeof appRouter;
