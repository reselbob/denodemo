import {BackingService} from "../enums/backing_service.ts";
import {PubberSubberStatus} from "../enums/pubbersubbser_status.ts";

export interface IPubberSubber {
    connection: any;
    backingService: BackingService
    source: string;
    id?: string;
    routingKey?: string;
    queueName?: string;
    host?: string;
    port?: number;
    userName?: string;
    password?: string;

    connect(): Promise<PubberSubberStatus>;

    disconnect(): Promise<PubberSubberStatus>;
}