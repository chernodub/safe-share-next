import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => ({
        greeting: `Hello ${input.text}`,
    })),

  getAll: publicProcedure.query(({ ctx }) => ctx.prisma.example.findMany()),

  getSecretMessage: protectedProcedure.query(() => 'you can now see this secret message!'),
});
