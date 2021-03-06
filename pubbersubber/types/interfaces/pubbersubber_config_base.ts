import {BackingService} from "../enums/backing_service.ts";

export interface IPubberSubberConfigBase {
    backingService: BackingService
    source: string;
    routingKey?: string;
    queueName?: string;
    host?: string;
    port?: number;
    userName?: string;
    password?: string;
}