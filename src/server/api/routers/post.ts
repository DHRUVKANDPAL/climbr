import { z } from "zod";

import { createTRPCRouter, protectedProdcedure, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: protectedProdcedure
    .query(async({ctx }) => {
      return await ctx.db.post.findFirst({
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });
    }),

  create: protectedProdcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

});
