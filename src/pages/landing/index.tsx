import Elysia from "elysia";
import { Html } from "@elysiajs/html";
import BaseHtml from "../../component/common/base";
import NavBar from "../../component/common/navbar";
import FirstComponent from "../../component/FirstComponent";
import Test from "../../component/Text";

const landingRoute = new Elysia()
  .get('/', (ctx) => { 

    return (
    <BaseHtml>
      <>
        <NavBar />
        <div class='flex flex-col justify-center items-center h-screen'>
          <FirstComponent />
          <Test />
        </div>
      </>
    </BaseHtml>
  )})

export { landingRoute }