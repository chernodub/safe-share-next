
import { z } from 'zod';

import { prisma } from '../../db';

import { createTRPCRouter, protectedProcedure } from '../trpc';

const PAGE_SCHEMA = z.object({
  page: z.number().min(0),
  pageSize: z.number().min(1),
});

function mapPageInputPrismaQuery(input: { page: number; pageSize: number; }): { skip: number; take: number; } | undefined {
  return {
    skip: input.page * input.pageSize,
    take: input.pageSize,
  };
}

export const messageRouter = createTRPCRouter({
  getPage: protectedProcedure
    .input(PAGE_SCHEMA)
    .query(({ input }) => prisma.message.findMany(mapPageInputPrismaQuery(input))),
});
