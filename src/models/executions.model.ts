import mongoose from "mongoose";
import { ExecutionStatusEnum } from "../interfaces";

// Execution
//     processId (ObjectId, referencia a Process, requerido)
//     startDate (date, requerido)
//     endDate (date, opcional)
//     operatorUsername (string, requerido)
//     status (enum: running, stopped, default: running)
//     notes (string)
//     measuredPH (number)
//     measuredTemperature (number)

export interface ExecutionDocument extends mongoose.Document {
    processId: number;
    startDate: Date;
    endDate: Date;
    operatorUsername: string;
    status: ExecutionStatusEnum;
    notes: string;
    measuredPH: number;
    measuredTemperature: number;
}

const executionSchema = new mongoose.Schema({
    processId: { type: mongoose.Schema.Types.ObjectId, ref: "Process", required: true },
    startDate: { type: Date, required: true, default: Date.now() },
    endDate: { type: Date, required: false },
    operatorUsername: { type: String, required: true },
    status: { type: String, enum: Object.values(ExecutionStatusEnum), default: "running" },
    notes: { type: String },
    measuredPH: { type: Number },
    measuredTemperature: { type: Number },
}, {timestamps: true, collection: "executions"});

export const ExecutionModel = mongoose.model<ExecutionDocument>("Execution", executionSchema);