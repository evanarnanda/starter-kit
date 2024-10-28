# HTMX w/ JSX Syntax and Elysia as backend ??

## About
This Project is for stater kits that use HTMX with JSX Syntax.
Why? because i kinnda like jsx but i struggle with react lmao.
2 SE influence me to use HTMX but they use django or Go.
So instead using those, I use TS and i found out about [Elysia JS](https://elysiajs.com/) and it's support html with jsx syntax. I'm not yet really now how they work but I start the project anyway.

Stack in this project are:
- Nix (for development shell)
- Bun (for runtime)
- HTMX (for client side interactions)
- Tailwind + Daisy UI (for styling)
- Docker
- Postgresql (for database) + Drizzle ORM 

### Features
- [ ] Landing page
- [ ] Example Protected Route
  - [ ] isAuthenticated
  - [ ] By Role
- [ ] Authentication (From Scratch, not all the code thooo)
  - [ ] Sign Up
  - [ ] Sign In
  - [ ] Email Verification
  - [ ] 2 Factor Authentication?
  - [ ] Forgot Password
- [ ] API
  - [ ] TBD!!!

## Getting Started
```
Please this readme is not yet adjust how to run this project. But if you can run it that's cool. Good Luck!
```

To install bun we will use Nix, simply just follow [Zero To Nix](https://zero-to-nix.com/start):
if you successfully installed Nix, you should be able to run this command:
```bash
nix-shell
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.
