# Sportify Backend

Backend API for the Sportify field booking frontend. Built with Express and Prisma, featuring modular routing, controllers, services, and repositories.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a PostgreSQL database (local Docker container or managed instance).
3. Copy `.env.example` to `.env` and replace the placeholders in `DATABASE_URL` with your credentials, e.g.:
   ```ini
   DATABASE_URL="postgresql://postgres:password@localhost:5432/sportify?schema=public"
   ```
4. Apply Prisma migrations to provision the schema in PostgreSQL:
   ```bash
   npx prisma migrate dev --name init
   ```
   > If you already have tables, run `npx prisma db push --accept-data-loss` instead to align the schema (be careful with production data).
5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `server.js`: Entry point for the Express app
- `prisma/`: Prisma schema and migrations
- `src/config`: Configuration utilities (database, etc.)
- `src/controllers`: Request handlers per domain
- `src/routes`: Express routers
- `src/middlewares`: Auth, validation, and error handling
- `src/services`: Payment/email/notification integrations
- `src/utils`: Helpers and response builder
- `src/repositories`: Database access layer using Prisma
- `src/docs`: API documentation (OpenAPI/Swagger)
- `public/uploads`: Static upload directory
- `tests/`: Placeholder tests

## API Docs

OpenAPI spec is available in `src/docs/api-docs.yaml`. You can serve it with Swagger UI or import it into API tooling.

## Connecting to your PostgreSQL instance

1. Ensure PostgreSQL is running and reachable from this backend (firewall/SSL as needed).
2. Set `DATABASE_URL` in `.env` using the format Prisma expects: `postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public`.
3. Run `npx prisma migrate dev` (local/dev) or `npx prisma migrate deploy` (production) to create/update tables.
4. Regenerate the Prisma Client after schema changes:
   ```bash
   npx prisma generate
   ```
5. Restart the server so Prisma picks up the new connection.
