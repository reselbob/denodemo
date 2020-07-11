import {IPubberSubber} from '../interfaces/pubbersubber.ts';
import {BackingService} from '../enums/backing_service.ts';
import {IPubberSubberConfigBase} from '../interfaces/pubbersubber_config_base.ts';
import {PubberSubberStatus} from '../enums/pubbersubbser_status.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

export abstract class PubberSubberBase implements IPubberSubber {
    backingService: BackingService
    source: string;
    id?: string;
    routingKey?: string;
    queueName?: string;
    host?: string;
    port?: number;
    userName?: string;
    password?: string;
    connection: any

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

    abstract  async connect(): Promise<PubberSubberStatus>;

    abstract async disconnect(): Promise<PubberSubberStatus>;
}