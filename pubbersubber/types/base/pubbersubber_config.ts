import {IPubberSubberConfigBase} from "../interfaces/pubbersubber_config_base.ts";
import {BackingService} from "../enums/backing_service.ts";
import {PubberSubberStatus} from "../enums/pubbersubbser_status.ts";

export abstract class PubberSubberConfigBase implements IPubberSubberConfigBase {
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

    async initializeAsync(): Promise<void> {
        await this.validate();
    }
}