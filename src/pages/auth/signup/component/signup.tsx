import { Html } from "@elysiajs/html";
import { SignUpForm } from "../../component/forms";

export default function SignUp () {
  const error = {
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  }
  return (
    <div class='flex flex-col justify-center items-center h-screen'>
      <SignUpForm error={error}/>
    </div>
  )
}