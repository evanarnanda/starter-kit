import { Elysia } from "elysia";
import { html, Html } from '@elysiajs/html';
const app = new Elysia()
.use(html())
.get('/', () => (
  <BaseHtml>
    <h1>This wrap from BaseHTML</h1>
  </BaseHtml>
))
.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


function BaseHtml( { children }: JSX.ElementChildrenAttribute ) {
    return (
    <html lang='en'>
        <head>
            <title>Base HTML</title>
        </head>
        <body>
            {children}
        </body>
    </html>
    )
} 