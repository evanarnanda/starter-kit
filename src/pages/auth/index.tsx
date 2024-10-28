import Elysia from "elysia";
import { signIn } from "./sign-in/index";
import { signUp } from "./signup/index";
import { validateSessionToken } from "../../lib/auth";

const auth = new Elysia( { prefix: '/auth' } )
.onBeforeHandle( async({ cookie, redirect }) => {
  const token = cookie.session.value
  console.log(token)

  const { session, user } = await validateSessionToken(token ?? '')

  if (session) {
    return redirect('/')
  }
})
.use(signIn)
.use(signUp)

export { auth }