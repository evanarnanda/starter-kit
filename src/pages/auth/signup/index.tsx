import { Html, html } from "@elysiajs/html"
import Elysia from "elysia"
import SignUp from "./component/signup"
import BaseHtml from "../../../component/common/base"


const signUp = new Elysia()
.get('/signup', () => (
  <BaseHtml>
    <SignUp />
  </BaseHtml>
))

export { signUp }