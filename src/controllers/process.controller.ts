import { Request, Response } from "express";
import { ProcessDocument } from "../models";
import { ProcessInput } from "../interfaces";
import { processesService } from "../services";

class ProcessController {
    public async create(req: Request, res: Response) {
        try {
            const newProcess: ProcessDocument = await processesService.create(req.body as ProcessInput);
            res.status(201).json(newProcess);
        } catch (error) {
            if (error instanceof ReferenceError) {
                res.status(400).json({ message: "Process not found" });
            }
            res.status(500).json(error);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const processes: ProcessDocument[] = await processesService.getAll();
            res.json(processes);
        } catch (error) {
            res.status(500);
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const process: ProcessDocument | null = await processesService.getById(id);
            if (process === null) {
                res.status(404).json({ message : `Process with id ${id} not found.` });
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
            const process: ProcessDocument | null = await processesService.updateById(id, req.body as ProcessInput);
            if (process === null) {
                res.status(404).json({ message: `Process with id ${id} not found` });
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
            const deleted: boolean = await processesService.delete(id);
            if(!deleted) {
                res.status(404).json({ message: `Process with id ${id} not found` });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const processController = new ProcessController();