import { Elysia } from "elysia";
import { html, Html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static'
import { tailwind } from "@gtramontina.com/elysia-tailwind";
import { swagger } from "@elysiajs/swagger";
import { logger } from "@bogeychan/elysia-logger";
import { htmx } from "@gtramontina.com/elysia-htmx";
import { env } from "./env";

import Test from "./src/component/Text";
import FirstComponent from "./src/component/FirstComponent";
import BaseHtml from "./src/component/common/base";
import NavBar from "./src/component/common/navbar";
import { auth } from "./src/auth";
import { apiRouteV1 } from "./src/api";
import { pagesRoutes } from "./src/pages";
const app = new Elysia()
.use(swagger())
.use(html())
.use(staticPlugin())
.use(tailwind({                           // 2. Use
  path: "/public/dist/output.css",       // 2.1 Where to serve the compiled stylesheet;
  source: "./style/input.css",        // 2.2 Specify source file path (where your @tailwind directives are);
  config: "./tailwind.config.js",       // 2.3 Specify config file path or Config object;
  options: {                            // 2.4 Optionally Specify options:
      minify: true,                     // 2.4.1 Minify the output stylesheet (default: NODE_ENV === "production");
      map: true,                        // 2.4.2 Generate source map (default: NODE_ENV !== "production");
      autoprefixer: false               // 2.4.3 Whether to use autoprefixer;
  },
}))
.use(
  logger({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  })
)
.use(htmx())
.use(pagesRoutes)
.use(apiRouteV1)
.use(auth);

app.listen({port: env.PORT }, ({ hostname, port }) => {
  const url = env.NODE_ENV === 'production' ? 'https' : 'http'

  console.log(
    `🦊 Elysia is running at ${url}://${hostname}:${port}`
  );
})