# Elysia with Bun runtime

## About
This Project is for stater kits that use the Bun runtime.
Stack in this project are:
- Nix (for development shell)
- Bun (for runtime)
- HTMX (for client side interactions)
- Tailwind + Daisy UI(for styling)
- Docker
- Postgresql (for database)

## Getting Started
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