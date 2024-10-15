import { Elysia } from "elysia";
import { authRoutes } from "./auth";

export const apiRouteV1 = new Elysia({prefix: '/api/v1' })
    .use(authRoutes)