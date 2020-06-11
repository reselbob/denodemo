import {BackingService} from './backing_service.ts';
import {Nullable} from './mod.ts';

export interface IPubberSubberConfigBase{
    backingService: BackingService
    source: string;
    routingKey?: string;
    host?: string;
    port?: number;
    userName?: string;
    password?: string;
}

export enum PubberSubberStatus{
    OK,
    ERROR
}

export abstract class PubberSubberBase{
    backingService: BackingService
    source: string;
    routingKey?: string;
    host?: string;
    port?: number;
    userName?: string;
    password?: string;  
    constructor(config: IPubberSubberConfigBase) { 
        this.backingService = config.backingService
        this.source = config.source;
        this.routingKey = config.routingKey;
        this.host = config.host;
        this.port = config.port;
        this.userName = config.userName;
        this.password = config.password;
    }

    async abstract disconnect(): Promise<PubberSubberStatus>;
}