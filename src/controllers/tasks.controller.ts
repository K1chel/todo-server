import { RequestHandler } from "express";

import { prisma } from "../lib/prisma";
import {
  CreateTaskBody,
  UpdateTaskBody,
  UpdateTaskParams,
} from "../types/tasks";
import createHttpError from "http-errors";
import { getTaskById } from "../services/task.service";

export const getTasksController: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTaskController: RequestHandler<UpdateTaskParams> = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    const task = await getTaskById({ id });

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const createTaskController: RequestHandler<
  unknown,
  unknown,
  CreateTaskBody,
  unknown
> = async (req, res, next) => {
  const { title, color } = req.body;
  try {
    if (!title) {
      throw new createHttpError.BadRequest("Title is required");
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        color,
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

export const updateTaskController: RequestHandler<
  UpdateTaskParams,
  unknown,
  UpdateTaskBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;
  try {
    let taskToUpdate = await getTaskById({ id });

    const requiredTitle = title !== undefined ? title : taskToUpdate.title;

    if (!requiredTitle || requiredTitle.trim() === "") {
      throw new createHttpError.BadRequest("Title is required");
    }

    taskToUpdate = await prisma.task.update({
      where: { id },
      data: {
        title: requiredTitle,
        color,
        completed,
      },
    });

    res.status(200).json(taskToUpdate);
  } catch (error) {
    next(error);
  }
};

export const deleteTaskController: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const taskToDelete = await getTaskById({ id });

    await prisma.task.delete({
      where: { id },
    });

    res.status(204).json(true);
  } catch (error) {
    next(error);
  }
};
