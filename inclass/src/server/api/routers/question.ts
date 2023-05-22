import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  
    create: protectedProcedure
    .input(z.object({ content: z.string(), signalTime: z.string(), classId: z.string() }))
    .mutation( ({ ctx, input }) => {
        return ctx.prisma.question.create({
            data: {
                content: input.content,
                signalTime: input.signalTime,
                classId: input.classId,
                userId: ctx.session.user.id
            }
        })
    }), 
    
    getAll: protectedProcedure
    .input(z.object({ classId: z.string()}))
    .query(({ ctx, input }) => {
       
        return ctx.prisma.question.findMany({
            where: {
                classId: input.classId
            }
        });
    }),

    delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        return ctx.prisma.question.delete({
            where: {
                id: input.id
            }
        })
    })

})

