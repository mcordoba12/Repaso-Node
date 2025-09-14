import { ProcessDocument, ProcessModel } from "../models";
import { ProcessInput } from "../interfaces";

class ProcessService {
    public async create(processInput: ProcessInput): Promise<ProcessDocument> {
        return ProcessModel.create(processInput);
    }

    public async updateById(id: string, processInput: ProcessInput): Promise<ProcessDocument | null> {
        try {
            const board: ProcessDocument | null = await ProcessModel.findOneAndUpdate(
                { _id: id },
                processInput,
                { returnOriginal: false }
            );

            return board;
        } catch (error) {
            throw error;
        }
    }

    public getAll(): Promise<ProcessDocument[]> {
        return ProcessModel.find().populate('')
    }

    public async delete(id: string): Promise<boolean> {
        try {
            const result = await ProcessModel.findByIdAndUpdate(id, { deletedAt: new Date() })
            return result !== null;
        } catch (error) {
            throw error;
        }
    }

    public async getById(id: string): Promise<ProcessDocument | null> {
        return ProcessModel.findById(id);
    }
}

export const processesService = new ProcessService();