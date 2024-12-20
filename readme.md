# Todo App Backend Setup

## Prerequisites

Make sure you have Node.js installed on your machine. Express 4.x requires Node.js 0.10 or higher.

## Clone the Repository

```bash
git clone https://github.com/K1chel/todo-server
cd todo-server
```

## Installation

Install the necessary dependencies:

```bash
npm install
```

## Setting Up the Database

### PostgreSQL

To install and run PostgreSQL locally, follow these steps:

1. **Install PostgreSQL**:

- On macOS: `brew install postgresql`
- On Ubuntu: `sudo apt-get install postgresql postgresql-contrib`
- On Windows: Download and install from [PostgreSQL official site](https://www.postgresql.org/download/).

2. **Start PostgreSQL**:

- On macOS: `brew services start postgresql`
- On Ubuntu: `sudo service postgresql start`
- On Windows: Start the PostgreSQL service from the Services app.

3. **Create a Database**:

```bash
psql postgres
CREATE DATABASE todo_app;
```

4. **Set Up Database User**:

- Connect to PostgreSQL:

```bash
psql postgres
```

- Create a new user and set a password:

```sql
CREATE USER todo_user WITH PASSWORD 'yourpassword';
```

- Grant all privileges on the database to the new user:

```sql
GRANT ALL PRIVILEGES ON DATABASE todo_app TO todo_user;
```

5. **Update Environment Variables**:

In your `.env` file, update the `DATABASE_URL` with the following format:

```env
DATABASE_URL="postgresql://todo_user:yourpassword@localhost:5432/todo_app"
```

### Using Neon

For easy access, you can use the Neon service: [Neon](https://neon.tech/)

## Environment Variables

Rename `.env.example` to `.env` and update the following variables:

```env
PORT="5000" // default port
FRONTEND_URL="http://localhost:3000" // default URL for Next.js applications
DATABASE_URL="" // paste your database URL here
```

## Prisma Setup

After configuring the database, run the following command to connect Prisma to your database:

```bash
npx prisma migrate dev --name init
```

For more details, refer to the Prisma documentation: [Prisma Docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgresql)

## Running the Server

Now that our project is set up, use the following command to run the server:

```bash
npm run dev
```
