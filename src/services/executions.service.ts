import { ExecutionDocument, ExecutionModel } from "../models";
import { ExecutionInput } from "../interfaces";

class ExecutionService {
    public async create(executionInput: ExecutionInput): Promise<ExecutionDocument> {
        return ExecutionModel.create(executionInput);
    }

    public async updateById(id: string, executionInput: ExecutionInput): Promise<ExecutionDocument | null> {
        try {
            const board: ExecutionDocument | null = await ExecutionModel.findOneAndUpdate(
                { _id: id },
                executionInput,
                { returnOriginal: false }
            );

            return board;
        } catch (error) {
            throw error;
        }
    }

    public getAll(): Promise<ExecutionDocument[]> {
        return ExecutionModel.find().populate('')
    }

    public async delete(id: string): Promise<boolean> {
        try {
            const result = await ExecutionModel.findByIdAndUpdate(id, { deletedAt: new Date() })
            return result !== null;
        } catch (error) {
            throw error;
        }
    }

    public async getById(id: string): Promise<ExecutionDocument | null> {
        return ExecutionModel.findById(id);
    }

    public async getByProcessId(id: string): Promise<ExecutionDocument[]> {
        return ExecutionModel.find({processId: id});
    }
}

export const executionsService = new ExecutionService();