import mongoose from "mongoose";
import { ProcessStateEnum } from "../interfaces";

/*
Process
    name (string, requerido)
    description (string)
    state (enum: draft, active, archived)
    targetTemperature (number)
    targetPH (number)
    maxDurationHours (number)
    createdAt (date, default: now)
*/

export interface ProcessDocument extends mongoose.Document {
    name: string;
    description: string;
    state: ProcessStateEnum;
    targetTemperature: number;
    targetPH: number;
    maxDurationHours: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const processSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    state: { type: String, enum: Object.values(ProcessStateEnum) },
    targetTemperature: { type: Number },
    targetPH: { type: Number },
    maxDurationHours: { type: Number },
    createdAt: { type: Date },
}, {timestamps: true, collection: "processes"});

export const ProcessModel = mongoose.model<ProcessDocument>("Process", processSchema);