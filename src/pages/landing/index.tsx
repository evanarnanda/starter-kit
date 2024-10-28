import Elysia from "elysia";
import { Html } from "@elysiajs/html";
import BaseHtml from "../../component/common/base";
import NavBar from "../../component/common/navbar";
import FirstComponent from "../../component/FirstComponent";
import Test from "../../component/Text";
import { validateSessionToken } from "../../lib/auth";

const landingRoute = new Elysia()
  .get('/', async ({ cookie }) => { 
    const token = cookie.session.value

    const { session, user } = await validateSessionToken(token ?? '')

    return (
      <BaseHtml>
        <>
          <NavBar user={user}/>
          <div class='flex flex-col justify-center items-center h-screen'>
            <FirstComponent />
            <Test />
          </div>
        </>
      </BaseHtml>
    )
  })

export { landingRoute }