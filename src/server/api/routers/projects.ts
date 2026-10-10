import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getProjects } from "~/server/github";

export const projectsRouter = createTRPCRouter({
  list: publicProcedure.query(() => getProjects()),
});
