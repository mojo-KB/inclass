import { z } from "zod";
import { createTRPCRouter,  protectedProcedure} from "../trpc";


export const topicRouter = createTRPCRouter({
    getAll: protectedProcedure
        .query(({ ctx }) => {
            return ctx.prisma.classSession.findMany({
            where: {
                userId: ctx.session.user.id,
            }
        });
    }),

    create: protectedProcedure
    .input(z.object({ title: z.string(), duration: z.number(), capsity: z.number() }))
    .mutation( ({ ctx, input }) => {
        return ctx.prisma.classSession.create({
            data: {
                title: input.title,
                duration: input.duration,
                capasity: input.capsity,
                userId: ctx.session.user.id
            }
        })
    })
})