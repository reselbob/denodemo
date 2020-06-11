import {BackingService} from './mod.ts';
import {Nullable} from './mod.ts';
import {PubberSubberBase} from './mod.ts';
import {IPubberSubberConfigBase} from './mod.ts';
import {PubberSubberStatus} from './mod.ts';

export interface ISubscriberConfig extends IPubberSubberConfigBase{
    queueName?: string;
}

export class Subscriber extends PubberSubberBase{
    queueName?: string;

    constructor(config: ISubscriberConfig) { 
        super(config as IPubberSubberConfigBase )
        this.queueName = config.queueName
    }

    async subscribe(handler: Function): Promise<void> { 

    }

    async disconnect(): Promise<PubberSubberStatus> {
        return PubberSubberStatus.ERROR
        
    }
}