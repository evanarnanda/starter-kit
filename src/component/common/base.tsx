import { Html } from '@elysiajs/html'
export default function BaseHtml( { children }: { children: JSX.Element } ) {
  return (
  <html lang='en' >
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="/public/dist/htmx.min.js"></script>
      <script src="/public/htmx.js"></script>
      <link rel="stylesheet" href="/public/dist/output.css" />
          <title>Base HTML</title>
      </head>
      <body>
          {children}
      </body>
  </html>
  )
} 