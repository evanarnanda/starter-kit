import { Html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import { z } from "zod";
import { ErrorMassage } from "../../auth/component/forms";
import { db } from "../../lib/db";
import { userTable } from "../../db/schemas/auth";
import { eq } from "drizzle-orm";

const SignUpSchema = {
  body: t.Object({
    email: t.String(),
    password: t.String(),
  }),
  detail: {
    tags: ['/v1/auth']
  }
}

export const authRoutes = new Elysia({prefix: '/auth'})

  .post('/signup', async ({ error, body }) => {

    const signupSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8).max(255),
    })
    const parsed = signupSchema.safeParse(body)

    if (!parsed.success) {
      const inputError = parsed.error.flatten().fieldErrors
      const email = inputError.email
      const password = inputError.password
      
      return error(422,
        <div id='response-div' class='flex flex-col space-y-2'>
          {email && <ErrorMassage massage={email[0]} />}
          {password && <ErrorMassage massage={password[0]} />}
        </div>
      )
    }

    const { email, password } = parsed.data

    // const existing = await db.select().from(userTable).where(
    //   eq(userTable.email, email)
    // )

    if (email === 'ketek@mail.com' ) {
      return error(422,
        <div id='response-div' class='flex flex-col space-y-2'>
          <ErrorMassage massage='Email already exists' />
        </div>
      )
    }
    
    return {
      body: body
    }
    }, SignUpSchema)

  .post('/signin', async ({ body }) => {
    return {
      body: body
    }
  })

  .delete('logout', async ( ) => {})