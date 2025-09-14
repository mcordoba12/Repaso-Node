import { ProcessStateEnum } from "./processes.enum";

export interface ProcessInput {
    name: string;
    description: string;
    state: ProcessStateEnum;
    targetTemperature: number;
    targetPH: number;
    maxDurationHours: number;
}