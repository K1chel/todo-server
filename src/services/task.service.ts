import createHttpError from "http-errors";

import { prisma } from "../lib/prisma";

export const getTaskById = async ({ id }: { id: string }) => {
  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task) {
    throw new createHttpError.NotFound("Task not found");
  }

  return task;
};
