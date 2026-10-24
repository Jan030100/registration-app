# Full-Stack User Registration System

A modern, responsive web application for creating user accounts. The project began as a frontend registration form with client-side validation and was extended into a full-stack application with a backend API, persistent database storage, and secure password hashing.

## Features

### Frontend

- Modern, responsive UI built with React and custom CSS.
- Registration form with full name, email, password, and password confirmation fields.
- Client-side validation for required fields, valid email format, and matching passwords.
- Clear feedback for submission, success, and error states.

### Backend

- REST API built with Express and TypeScript.
- Server-side data validation with Zod.
- Persistent SQLite storage with database access and migrations managed by Prisma.
- Password hashing with bcrypt before passwords are stored.
- Centralized error handling and CORS configuration.
- Separation of concerns across routes, controllers, services, and middleware.

## Technology Stack

| Area | Technologies |
| --- | --- |
| Frontend | React, Vite, TypeScript, CSS3 |
| Backend | Node.js, Express, TypeScript |
| Database | SQLite, Prisma ORM |
| Validation and security | Zod, bcrypt |

## Project Structure

```text
registration-app/
├── client/                         # React application
│   ├── src/
│   │   ├── components/             # UI components, including the registration form
│   │   ├── pages/                  # Application pages
│   │   ├── services/               # API communication
│   │   ├── types/                  # TypeScript definitions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── server/                         # Express server
│   ├── prisma/                     # Database schema and migrations
│   ├── src/
│   │   ├── config/                 # Environment configuration
│   │   ├── controllers/            # Request handlers
│   │   ├── lib/                    # Prisma initialization
│   │   ├── middleware/             # Validation and error handling
│   │   ├── routes/                 # API routes
│   │   ├── schemas/                # Zod schemas
│   │   ├── services/               # Business logic and database access
│   │   ├── utils/                  # Utilities and API errors
│   │   └── server.ts
│   ├── prisma7.config.ts
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 20 or later.
- npm.

## Local Development Setup

### 1. Set Up the Backend and Database

From the project root, install the server dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following values:

```env
DATABASE_URL="file:./dev.db"
PORT=3001
CORS_ORIGIN="http://localhost:5173"
NODE_ENV="development"
```

Generate the Prisma Client and apply the database migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

The server will run at `http://localhost:3001` by default.

### 2. Set Up the Frontend

Open another terminal, navigate to the project root, and install the client dependencies:

```bash
cd client
npm install
```

Optionally, create a `.env` file in the `client` directory to configure the API URL:

```env
VITE_API_URL="http://localhost:3001"
```

If `VITE_API_URL` is not set, the frontend uses `http://localhost:3001` by default.

Start the frontend development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` by default.

## API Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Check the server health. |
| `POST` | `/api/auth/register` | Create a new user account. |

The registration endpoint expects a JSON body with the following fields:

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

The full name must be at least 2 characters long. Passwords must be between 8 and 72 characters, and the password and confirmation must match. Each email address can only be used for one account.

## Security

- Passwords are never stored in plain text; they are hashed with bcrypt using a cost factor of 12.
- Registration responses do not include the password hash.
- Request data is validated on the server using Zod.
- The database enforces a unique constraint on email addresses.
- Do not commit `.env` files or the local database to version control.
