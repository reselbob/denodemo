import {BackingService} from './mod.ts';
import {Nullable} from './mod.ts';
import {PubberSubberBase} from './mod.ts';
import {IPubberSubberConfigBase} from './mod.ts';
import {PubberSubberStatus} from './mod.ts';

export interface IPublisherConfig extends IPubberSubberConfigBase{}

export class Publisher extends PubberSubberBase{  

    constructor( config: IPublisherConfig){
        super(config as IPubberSubberConfigBase)
    }


    async publish(message: string): Promise<void> { 

    }

    async disconnect(): Promise<PubberSubberStatus> {
        return PubberSubberStatus.ERROR;
    }
}