import { Html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import { z } from "zod";
import { ErrorMassage } from "../../auth/component/forms";
import { db } from "../../lib/db";
import { userTable } from "../../db/schemas/auth";
import { eq } from "drizzle-orm";
import { catchError } from "../../lib/error";
import { createSession, generateIdFromEntropySize, generateSessionToken } from "../../lib/auth";
import { env } from "bun";

const SignUpSchema = {
  body: t.Object({
    email: t.String(),
    password: t.String(),
    confirmPassword: t.String(),
  }),
  detail: {
    tags: ['/v1/auth']
  }
}

export const authRoutes = new Elysia({prefix: '/auth'})

  .post('/signup', async ({ set, error, body, cookie: { session }, redirect }) => {

    const signupSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8).max(255),
      confirmPassword: z.string().min(8).max(255),
    }).superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ['confirmPassword']
        });
      }
    });
    const parsed = signupSchema.safeParse(body)

    if (!parsed.success) {
      const inputError = parsed.error.flatten().fieldErrors
      const email = inputError.email
      const password = inputError.password
      const confirmPassword = inputError.confirmPassword

      return error(422,
        <div id='response-div' class='flex flex-col space-y-2'>
          {email && <ErrorMassage massage={email[0]} />}
          {password && <ErrorMassage massage={password[0]} />}
          {confirmPassword && <ErrorMassage massage={confirmPassword[0]} />}
        </div>
      )
    }

    const { email, password } = parsed.data

    const [errorQueryExisting, existing] = await catchError(
        db.select().from(userTable).where(
          eq(userTable.email, email)
        )
    )

    if (errorQueryExisting) {
      return error(500,
        <div id='response-div' class='flex flex-col space-y-2'>
          <ErrorMassage massage='Oops We are really sorry, something went wrong! Try again later!' />
        </div>
      )
    }

    if (existing && existing.length > 0) {
      return error(422,
        <div id='response-div' class='flex flex-col space-y-2'>
          <ErrorMassage massage='Email already exists' />
        </div>
      )
    }

    const id = generateIdFromEntropySize(21)
    const [errorInsertUser, insertUser] = await catchError(db.insert(userTable).values({
        id: id,
        email: email,
        password: password,
      }).returning({ insertedId: userTable.id })
    );

    if (errorInsertUser) {
      return error(500,
        <div id='response-div' class='flex flex-col space-y-2'>
          <ErrorMassage massage='Oops We are really sorry, something went wrong! Try again later!' />
        </div>
      )
    }  

    const sessionToken = generateSessionToken();
    const [errorSessionEvent, sessionEvent] = await catchError(createSession(sessionToken, insertUser[0].insertedId))

    if (errorSessionEvent) {
      return error(500, 
        <div id='response-div' class='flex flex-col space-y-2'>
          <ErrorMassage massage='Oops We are really sorry, something went wrong! Try again later!' />
        </div>
      )
    }

    session.set({
      value: sessionToken,
      httpOnly: true,
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: sessionEvent?.expiresAt
    })
    
    set.headers['HX-Redirect'] = '/'
    set.status = 303
  }, SignUpSchema)

  .post('/signin', async ({ body }) => {
    return {
      body: body
    }
  })

  .delete('logout', async ( ) => {})