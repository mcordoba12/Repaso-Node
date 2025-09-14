import { ExecutionStatusEnum } from "./executions.enum";

export interface ExecutionInput {
    operatorUsername: string;
    status: ExecutionStatusEnum;
    notes: string;
    measuredPH: number;
    measuredTemperature: number;
    processId: string;
    endDate: Date;
}