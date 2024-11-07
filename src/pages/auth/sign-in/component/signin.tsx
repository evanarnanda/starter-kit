import { Html } from "@elysiajs/html";
import { SignInForm } from "../../component/forms";

export default function SignIn () {
  const error = {
    email: undefined,
    password: undefined,
  }
  return (
    <div class='flex flex-col justify-center items-center h-screen'>
      <SignInForm error={error}/>
    </div>
  )
}