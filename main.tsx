import { Elysia } from "elysia";
import { html, Html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static'
import { tailwind } from "@gtramontina.com/elysia-tailwind";
import { swagger } from "@elysiajs/swagger";
import { logger } from "@bogeychan/elysia-logger";

import Test from "./src/component/Text";
import FirstComponent from "./src/component/FirstComponent";
import BaseHtml from "./src/component/common/base";
import NavBar from "./src/component/common/navbar";
import { auth } from "./src/auth";
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
.get('/', (ctx) => { 
    ctx.log.error(ctx, "Context");
    ctx.log.info(ctx.request, "Request"); // noop
    return (
    <BaseHtml>
      <>
        <NavBar />
        <div class='flex flex-col justify-center items-center h-screen'>
          <FirstComponent />
          <Test />
        </div>
      </>
    </BaseHtml>
  )})
.use(auth)
.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

