import { Html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import { z } from "zod";
import { ErrorMassage, SignInForm, SignUpForm } from "../../pages/auth/component/forms";
import { db } from "../../lib/db";
import { userTable } from "../../db/schemas/auth";
import { eq, and } from "drizzle-orm";
import { catchError } from "../../lib/error";
import { createSession, generateIdFromEntropySize, generateSessionToken, invalidateSession, validateSessionToken } from "../../lib/auth";
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
  .post('/signup', async ({ set, error, body, cookie: { session } }) => {

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
      const emailValue = inputError.email ? '' : body.email
      const passwordValue = inputError.password ? '' : body.password
      const confirmPasswordValue = inputError.confirmPassword ? '' : body.confirmPassword
      return error(422,
        <SignUpForm error={inputError} emailValue={emailValue} passwordValue={passwordValue} confirmPasswordValue={confirmPasswordValue} />
      )
    }

    const { email, password } = parsed.data

    const [errorQueryExisting, existing] = await catchError(
        db.select().from(userTable).where(
          eq(userTable.email, email)
        )
    )

    if (errorQueryExisting) {
      const inputError = {
        others: ['Oops We are really sorry, something went wrong! Try again later!']
      }
      return error(500,
        <SignUpForm error={inputError} emailValue={body.email} passwordValue={body.password}  />
      )
    }

    if (existing && existing.length > 0) {
      const inputError = {
        others: ['Email already exists!']
      }
      return error(422,
        <SignUpForm error={inputError} emailValue={body.email} passwordValue={body.password} />
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
      const inputError = {
        others: ['Oops We are really sorry, something went wrong! Try again later!']
      }
      return error(500,
        <SignUpForm error={inputError} emailValue={body.email} passwordValue={body.password} />
      )
    }  

    const sessionToken = generateSessionToken();
    const [errorSessionEvent, sessionEvent] = await catchError(createSession(sessionToken, insertUser[0].insertedId))

    if (errorSessionEvent) {
      const inputError = {
        others: ['Oops We are really sorry, something went wrong! Try again later!']
      }
      return error(500,
        <SignUpForm error={inputError} emailValue={body.email} passwordValue={body.password} />
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

  .post('/signin', async ({set, error, body, cookie }) => {
    
    const signinSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8).max(255),
    })

    const parsed = signinSchema.safeParse(body)

    if (!parsed.success) {
      const inputError = parsed.error.flatten().fieldErrors

      return error(422,
        <SignInForm error={inputError} />
      )
    }

    const { email, password } = parsed.data

    const [errorQueryExisting, existing] = await catchError(
        db.select().from(userTable).where(
          and(
            eq(userTable.email, email),
            eq(userTable.password, password)
          )
        )
    )

    if (errorQueryExisting) {
      const inputError = {
        others: ['Oops We are really sorry, something went wrong! Try again later!']
      }
      return error(500,
        <SignInForm error={inputError}  />
      )
    }

    if (existing.length === 0) {
      const inputError = {
        others: ['Email or password is incorrect!']
      }
      return error(422,
        <SignInForm error={inputError}  />
      )
    }
    
    const sessionToken = generateSessionToken();
    const [errorSessionEvent, sessionEvent] = await catchError(createSession(sessionToken, existing[0].id))

    if (errorSessionEvent) {
      const inputError = {
        others: ['Oops We are really sorry, something went wrong! Try again later!']
      }
      return error(500,
        <SignInForm error={inputError}  />
      )
    }

    cookie.session.set({
      value: sessionToken,
      httpOnly: true,
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: sessionEvent?.expiresAt
    })
    
    set.headers['HX-Redirect'] = '/'
    set.status = 303
    
  })

  .post('/signout', async ({ set, cookie, redirect}) => {
    const token = cookie.session.value
    const { session, user } = await validateSessionToken(token ?? '')
    const { deletedId } = await invalidateSession(session?.id ?? '')
    
    if (deletedId == null) {
      set.headers['HX-Redirect'] = '/'
      set.status = 303
    } else {
      console.log(deletedId)
      cookie.session.remove()
      delete cookie.session
      set.headers['HX-Redirect'] = '/'
      set.status = 303
    }
    
  })