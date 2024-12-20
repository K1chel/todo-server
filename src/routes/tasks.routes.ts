import { Router } from "express";

import {
  getTasksController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
  getTaskController,
} from "../controllers/tasks.controller";

const router = Router();

router.get("/", getTasksController);
router.get("/:id", getTaskController);
router.post("/", createTaskController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export const tasksRouter = router;
