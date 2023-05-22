import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const replyRouter = createTRPCRouter({
  create: protectedProcedure
  .input(z.object({ content: z.string(), questionId: z.string() }))
  .mutation( ({ ctx, input }) => {
    return ctx.prisma.reply.create({
      data: {
        content: input.content,
        questionId: input.questionId,
        userId: ctx.session.user.id
      }
    })
  }),

  getAll: protectedProcedure
  .input(z.object({ questionId: z.string()}))
  .query(({ ctx, input }) => {
     
      return ctx.prisma.reply.findMany({
          where: {
              questionId: input.questionId
          }
      });
  }),


  delete: protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.prisma.reply.delete({
      where: {
        id: input.id
      }
    })
  })

  
});
