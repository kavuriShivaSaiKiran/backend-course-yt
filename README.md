# Prisma ORM Movie Watchlist API

A lightweight Express.js API built with Prisma ORM and PostgreSQL for user authentication and movie watchlist management.

## Features

- User registration and login
- JWT-based authentication
- Protected watchlist creation flow
- Prisma schema with users, movies, and watchlist items
- Seed script for initial movie data

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

## Project Structure

```text
prisma-orm/
├─ src/
│  ├─ controllers/
│  │  ├─ authController.js
│  │  └─ watchlistController.js
│  ├─ middleware/
│  │  └─ authMiddleware.js
│  ├─ prisma/
│  │  ├─ db.js
│  │  ├─ contract.prisma
│  │  ├─ contract.json
│  │  ├─ logger.js
│  │  ├─ seed.js
│  │  └─ migrations/
│  ├─ routes/
│  │  ├─ authRoutes.js
│  │  ├─ movieroutes.js
│  │  └─ watchlistRoutes.js
│  ├─ utils/
│  │  └─ generateToken.js
│  ├─ server.js
│  └─ ...
├─ package.json
├─ prisma.config.ts
├─ README.md
└─ .env
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- PostgreSQL database available
- A `.env` file configured

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
JWT_SECRET="your_super_secret_key"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
```

## Installation

```bash
npm install
```

## Running the App

Start the development server:

```bash
npm run dev
```

The server runs on:

```text
http://localhost:8080
```

## Seeding Movies

Populate the database with sample movie data:

```bash
npm run seed:movies
```

## API Endpoints

### Authentication

#### Register a user

```http
POST /auth/register
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

#### Login

```http
POST /auth/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

#### Logout

```http
POST /auth/logout
```

### Movies

```http
GET /movies
POST /movies
PUT /movies
DELETE /movies
```

> These movie routes are currently stubbed and return placeholder responses. The main implemented business logic is centered around authentication and watchlist management.

### Watchlist

```http
POST /watchlist
```

Headers:

```http
Authorization: Bearer <jwt_token>
```

Request body:

```json
{
  "movieId": "movie_uuid_here",
  "status": "PLANNED",
  "rating": 8,
  "notes": "Looking forward to this one."
}
```

Valid watchlist statuses:

- `PLANNED`
- `WATCHING`
- `COMPLETED`
- `DROPPED`

## Authentication

Protected routes require a valid JWT in the `Authorization` header:

```http
Authorization: Bearer <token>
```

The middleware checks the token, validates it against `JWT_SECRET`, and attaches the authenticated user to the request.

## Prisma Schema Overview

The project includes the following main models:

- `User`
- `Movie`
- `WatchListItem`

Relationships:

- A user can create many movies
- A user can have many watchlist items
- A movie can appear in many user watchlists
- Each watchlist item is unique per user + movie combination

## Notes

- The application uses Prisma 8 runtime configuration.
- The database connection is initialized in `src/prisma/db.js`.
- The app listens on port `8080` by default.

## License

This project is currently unlicensed unless you add a license file or specify one in your package configuration.
