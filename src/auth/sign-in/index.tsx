import { Html, html } from "@elysiajs/html"
import Elysia from "elysia"
import SignIn from "./component/signin"
import BaseHtml from "../../component/common/base"


const signIn = new Elysia()
.get('/signin', () => (
  <BaseHtml>
    <SignIn />
  </BaseHtml>
))

export { signIn }