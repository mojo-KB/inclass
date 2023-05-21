import { z } from "zod";
import { createTRPCRouter,  protectedProcedure} from "../trpc";


export const classRouter = createTRPCRouter({
    getAll: protectedProcedure
        .query(({ ctx }) => {
            return ctx.prisma.class.findMany({
            where: {
                userId: ctx.session.user.id,
            }
        });
    }),

    create: protectedProcedure
    .input(z.object({ title: z.string(), duration: z.number(), capsity: z.number() }))
    .mutation( ({ ctx, input }) => {
        return ctx.prisma.class.create({
            data: {
                title: input.title,
                duration: input.duration,
                capasity: input.capsity,
                userId: ctx.session.user.id
            }
        })
    })
})