
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

const DELETE_MESSAGE_INPUT_SCHEME = z.object({
  id: z.string(),
});
const MESSAGE_SCHEME = z.object({
  content: z.string(),
});
export const messageRouter = createTRPCRouter({
  getPage: protectedProcedure
    .input(PAGE_SCHEMA)
    .query(async ({ input, ctx: { session } }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return prisma.message.findMany({
        ...mapPageInputPrismaQuery(input),
        where: {
          authorId: session.user.id,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
    }),
  create: protectedProcedure
    .input(MESSAGE_SCHEME)
    .mutation(async ({ input, ctx: { session } }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));

        return prisma.message.create({
          data: {
            text: input.content,
            author: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });
      }),
  edit: protectedProcedure
    .input(MESSAGE_SCHEME.extend({
      id: z.string(),
    }))
    .mutation(async ({ input, ctx: { session } }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));

        await prisma.message.findFirstOrThrow({
          where: {
            id: input.id,
            authorId: session.user.id,
          },
        });

        await prisma.message.update({
          data: {
            text: input.content,
          },
          where: {
            id: input.id,
          },
        });
      }),
  delete: protectedProcedure
    .input(DELETE_MESSAGE_INPUT_SCHEME)
    .mutation(async ({ input, ctx: { session } }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));

        await prisma.message.findFirstOrThrow({
          where: {
            id: input.id,
            authorId: session.user.id,
          },
        });

        return prisma.message.delete({
          where: {
            id: input.id,
          },
        });
      }),

});
