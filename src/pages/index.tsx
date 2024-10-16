import Elysia from "elysia";
import { landingRoute } from "./landing";


const pagesRoutes = new Elysia()
  .use(landingRoute)

export { pagesRoutes }