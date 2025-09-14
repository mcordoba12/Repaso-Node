import express, { Request, Response } from "express";
import { executionsController } from "../controllers";

export const router = express.Router();

router.post("/", executionsController.create);
router.get("/", executionsController.getAll);
router.get("/:id", executionsController.getById);
router.get("/process/:id", executionsController.getByProcessId);
router.put("/:id", executionsController.updateById);
router.delete("/:id", executionsController.deleteById);