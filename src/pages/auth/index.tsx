import Elysia from "elysia";
import { signIn } from "./sign-in/index";
import { signUp } from "./signup/index";

const auth = new Elysia( { prefix: '/auth' } )
.use(signIn)
.use(signUp)

export { auth }