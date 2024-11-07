import { Html } from "@elysiajs/html";
import { Spinner } from "../../../component/common/loading/spinner";

interface Error {
  email?: string[] 
  password?: string[] 
  confirmPassword?: string[] 
  others?: string[]
}
function SignInForm({error}: {error: Error}) {
  return (
    <div class="card bg-base-100 w-96 shadow-xl" id='signin-form'>
      <div class="card-body">
        <h2 class="card-title">Sign In!</h2>
        <form class='flex flex-col space-y-2' hx-post='/api/v1/auth/signin' hx-target="#signin-form" hx-swap='outerHTML' hx-disabled-elt="find button" hx-indicator="#spinner">
          <button class="btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-menu h-4 w-4 opacity-70"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h10"/></svg>
            Login Google!
          </button>
          {error.email != undefined ?
            <div class='form-control'>
              <label class="input input-bordered input-error flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="h-4 w-4 opacity-70">
                  <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" class="grow" placeholder="Email" name="email"/>
              </label>
              <div class="label">
                <span class="label-text-alt text-error">{error.email}</span>
              </div>
            </div>
            :
            <label class="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" class="grow" placeholder="Email" name="email"/>
            </label>
          }
          { error.password != undefined ? 
            <div class='form-control'>
              <label class="input input-bordered input-error flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="h-4 w-4 opacity-70">
                  <path
                    fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd" />
                </svg>
                <input type="password" class="grow" name="password" placeholder="password"/>
              </label>
              <div class="label">
                <span class="label-text-alt text-error">{error.password}</span>
              </div>
            </div>
            :
            <label class="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70">
                <path
                  fill-rule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clip-rule="evenodd" />
              </svg>
              <input type="password" class="grow" name="password" placeholder="password"/>
            </label>
          }
          { error.others ? 
            <div class='flex flex-col space-y-2'>
              <ErrorMassage massage={error.others[0]} />
            </div>
            :
            <></>
          }
          <div class="flex justify-between">
            <a class="link link-accent" href="/auth/signup">You have not sign up to our system?</a>
            <button class="btn btn-primary disabled:opacity-50" type="submit">
            <Spinner id="spinner" size={'loading-xs'}/>
              Sign In
            </button>
          </div>        
        </form>
        
      </div>
    </div>
  )
}

function SignUpForm({ error, emailValue, passwordValue, confirmPasswordValue }: {error: Error, emailValue?: string, passwordValue?: string, confirmPasswordValue?: string}) {
  return (
    <div class="card bg-base-100 w-96 shadow-xl" id='signup-form'>
      <div class="card-body">
        <h2 class="card-title">Sign Up!</h2>
        <form class='flex flex-col space-y-2' hx-post='/api/v1/auth/signup' hx-target="#signup-form" hx-swap='outerHTML' hx-disabled-elt="find button" hx-indicator="#spinner">
          {error.email != undefined?
            <div class='form-control'>
              <label class="input input-bordered input-error flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="h-4 w-4 opacity-70">
                  <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" class="grow" placeholder="Email" name="email"/>
              </label>
              <div class="label">
                <span class="label-text-alt text-error">{error.email}</span>
              </div>
            </div>
            :
            <label class="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" class="grow" placeholder="Email" name="email" value={emailValue ?? ''}/>
            </label>
          }
          { error.password != undefined ? 
            <div class='form-control'>
              <label class="input input-bordered input-error flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="h-4 w-4 opacity-70">
                  <path
                    fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd" />
                </svg>
                <input type="password" class="grow" value={passwordValue ?? ''} name="password" placeholder="password"/>
              </label>
              <div class="label">
                <span class="label-text-alt text-error">{error.password}</span>
              </div>
            </div>
            :
            <label class="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70">
                <path
                  fill-rule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clip-rule="evenodd" />
              </svg>
              <input type="password" class="grow" name="password" placeholder="password" value={passwordValue ?? ''}/>
            </label>
          }
          { error.confirmPassword != undefined ?
            <div class='form-control'>
              <label class="input input-bordered input-error flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="h-4 w-4 opacity-70">
                  <path
                    fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd" />
                </svg>
                <input type="password" class="grow" value="" name="confirmPassword" placeholder="confirm password"/>
              </label>
              <div class="label">
                <span class="label-text-alt text-error">{error.confirmPassword}</span>
              </div>
            </div>
            :
            <label class="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70">
                <path
                  fill-rule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clip-rule="evenodd" />
              </svg>
              <input type="password" class="grow" value="" name="confirmPassword" placeholder="confirm password"/>
            </label>
          }
          
          { error.others ? 
            <div class='flex flex-col space-y-2'>
              <ErrorMassage massage={error.others[0]} />
            </div>
            :
            <></>
          }
        <div class="flex justify-between" id='footer'>
          <a class="link link-accent" href="/auth/signin">Already have an account?</a>
          <button class="btn btn-primary disabled:opacity-50" type="submit">
          <Spinner id="spinner" size={'loading-xs'}/>
            Sign Up
          </button>
        </div>
        </form>
      </div>
    </div>
  )
}

function ErrorMassage({ massage }: {massage: string}) {
  return (
    <div role="alert" class="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{massage}</span>
    </div>
  )
}

export { 
  SignInForm, 
  SignUpForm, 
  ErrorMassage,
}