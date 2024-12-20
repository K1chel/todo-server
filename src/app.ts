import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";

import router from "./routes";
import env from "./lib/env";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [env.FRONTEND_URL],
    credentials: true,
  })
);

app.use("/api", router);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
