import Elysia from "elysia";
import { landingRoute } from "./landing";
import { auth } from "./auth";


const pagesRoutes = new Elysia()
  .use(landingRoute)
  .use(auth)

export { pagesRoutes }