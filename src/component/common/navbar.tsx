import { Html } from "@elysiajs/html";
import { User } from "../../db/schemas/auth";

interface Props {
  user: User | null
}
export default function NavBar ({user}: Props) {
  return (
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div class="flex-none">
        {
          user ? 
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <button class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </button>
              </li>
              <li><button>Settings</button></li>
              <li><button hx-post="/api/v1/auth/signout">Logout</button></li>
            </ul>
          </div> :
          <a href='/auth/signin' class='btn btn-primary'>Login</a>
        } 
          
        

      </div>
    </div>
  )
} 