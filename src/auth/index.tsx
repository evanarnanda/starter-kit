import Elysia from "elysia";
import { signIn } from "./sign-in/index";
import { register } from "./register/index";

const auth = new Elysia( { prefix: '/auth' } )
.use(signIn)
.use(register)

export { auth }