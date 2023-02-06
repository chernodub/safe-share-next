
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

const DELETE_POST_INPUT_SCHEME = z.object({
  id: z.string(),
});
const POST_SCHEME = z.object({
  content: z.string(),
});
export const postRouter = createTRPCRouter({
  getPage: protectedProcedure
    .input(PAGE_SCHEMA)
    .query(({ input, ctx: { session } }) => prisma.post.findMany({
      ...mapPageInputPrismaQuery(input),
      where: {
        authorId: session.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })),
  create: protectedProcedure
    .input(POST_SCHEME)
    .mutation(({ input, ctx: { session } }) =>
      prisma.post.create({
          data: {
            text: input.content,
            author: {
              connect: {
                id: session.user.id,
              },
            },
        },
      })),
  edit: protectedProcedure
    .input(POST_SCHEME.extend({
      id: z.string(),
    }))
    .mutation(async ({ input, ctx: { session } }) => {
        await prisma.post.findFirstOrThrow({
          where: {
            id: input.id,
            authorId: session.user.id,
          },
        });

        await prisma.post.update({
          data: {
            text: input.content,
          },
          where: {
            id: input.id,
          },
        });
      }),
  delete: protectedProcedure
    .input(DELETE_POST_INPUT_SCHEME)
    .mutation(async ({ input, ctx: { session } }) => {
        await prisma.post.findFirstOrThrow({
          where: {
            id: input.id,
            authorId: session.user.id,
          },
        });

        return prisma.post.delete({
          where: {
            id: input.id,
          },
        });
      }),

});
