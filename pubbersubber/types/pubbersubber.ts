import {BackingService} from './backing_service.ts';
import {Nullable} from './mod.ts';
import {v4} from "https://deno.land/std/uuid/mod.ts";

export interface IPubberSubberConfigBase{
    backingService: BackingService
    source: string;
    routingKey?: string;
    queueName?: string;
    host?: string;
    port?: number;
    userName?: string;
    password?: string;
}

export abstract class PubberSubberConfigBase implements IPubberSubberConfigBase{
    backingService: BackingService
    source: string;
    routingKey?: string;
    queueName?: string;
    host?: string;
    port?: number;
    userName?: string;
    password?: string;  
    constructor(config: IPubberSubberConfigBase) { 
        this.backingService = config.backingService
        this.source = config.source;
        this.routingKey = config.routingKey;
        this.queueName = config.queueName;
        this.host = config.host || 'localhost';
        this.port = config.port;
        this.userName = config.userName;
        this.password = config.password
        this.initializeAsync();
    }
    abstract validate(): Promise<PubberSubberStatus>;
    async  initializeAsync(): Promise<void>{
         await this.validate();
     }
}


export enum PubberSubberStatus{
    OK,
    ERROR
}

export interface IPubberSubber{
    backingService: BackingService
    source: string;
    id?: string;
    routingKey?: string;
    queueName?: string;
    host?: string;
    port?: number;
    userName?: string;
    password?: string;  
    disconnect(): Promise<PubberSubberStatus>;
}

export abstract class PubberSubberBase implements IPubberSubber{
    backingService: BackingService
    source: string;
    id?: string;
    routingKey?: string;
    queueName?: string;
    host?: string;
    port?: number;
    userName?: string;
    password?: string;  
    constructor(config: IPubberSubberConfigBase) { 
        this.id = v4.generate();
        this.backingService = config.backingService
        this.source = config.source;
        this.routingKey = config.routingKey;
        this.queueName = config.queueName;
        this.host = config.host;
        this.port = config.port;
        this.userName = config.userName;
        this.password = config.password;
    }

    async abstract disconnect(): Promise<PubberSubberStatus>;

}

export interface IPublisherConfig extends IPubberSubberConfigBase {}


export interface IPublisher extends IPubberSubber{
    publish(message: string): Promise<PubberSubberStatus>;
}

export interface ISubscriberConfig extends IPubberSubberConfigBase {}

export abstract class PublisherBase extends PubberSubberBase implements IPublisher{
    async abstract publish(): Promise<PubberSubberStatus>;
}

export interface ISubscriber extends IPubberSubber{
    subscribe(handler: Function): Promise<PubberSubberStatus>;
}

export abstract class SubscriberBase extends PubberSubberBase implements ISubscriber{
    async abstract subscribe(handler: Function): Promise<PubberSubberStatus>;
}