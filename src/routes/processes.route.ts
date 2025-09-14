import express, { Request, Response } from "express";
import { processController } from "../controllers";

export const router = express.Router();

router.post("/", processController.create);
router.get("/", processController.getAll);
router.get("/:id", processController.getById);
router.put("/:id", processController.updateById);
router.delete("/:id", processController.deleteById);