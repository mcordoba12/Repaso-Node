import { Request, Response } from "express";
import { ExecutionDocument } from "../models";
import { ExecutionInput } from "../interfaces";
import { executionsService } from "../services";

class ExecutionsController {
    public async create(req: Request, res: Response) {
        try {
            const newExecution: ExecutionDocument = await executionsService.create(req.body as ExecutionInput);
            res.status(201).json(newExecution);
        } catch (error) {
            if (error instanceof ReferenceError) {
                res.status(400).json({ message: "Execution not found" });
            }
            res.status(500).json(error);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const executions: ExecutionDocument[] = await executionsService.getAll();
            res.json(executions);
        } catch (error) {
            res.status(500);
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const process: ExecutionDocument | null = await executionsService.getById(id);
            if (process === null) {
                res.status(404).json({ message : `Execution with id ${id} not found.` });
                return;
            }
            res.json(process);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async updateById(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const process: ExecutionDocument | null = await executionsService.updateById(id, req.body as ExecutionInput);
            if (process === null) {
                res.status(404).json({ message: `Execution with id ${id} not found` });
                return;
            }
            res.json(process);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async deleteById(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const deleted: boolean = await executionsService.delete(id);
            if(!deleted) {
                res.status(404).json({ message: `Execution with id ${id} not found` });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getByProcessId(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const executions: ExecutionDocument[] = await executionsService.getByProcessId(id);
            res.json(executions);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const executionsController = new ExecutionsController();