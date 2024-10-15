import { Html, html } from "@elysiajs/html"
import Elysia from "elysia"
import Register from "./component/register"
import BaseHtml from "../../component/common/base"


const register = new Elysia()
.get('/register', () => (
  <BaseHtml>
    <Register />
  </BaseHtml>
))

export { register }