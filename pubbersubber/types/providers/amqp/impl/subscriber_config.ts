import {PubberSubberConfigBase} from "../../../base/pubbersubber_config.ts";
import {ISubscriberConfig} from "../../../interfaces/subscriber_config.ts";
import {PubberSubberStatus} from "../../../enums/pubbersubbser_status.ts";
import {Utils} from "./utils.ts";

export class SubscriberConfigImpl extends PubberSubberConfigBase
    implements ISubscriberConfig {
    constructor(config: ISubscriberConfig){
        super(config);
        this.queueName = config.queueName;

    }

    async validate(): Promise<PubberSubberStatus> {
        if (!this.queueName) throw new Error('No queue defined');
        if(!this.routingKey) throw new Error('No routingKey defined');

        Utils.validateCommonPropertiesSync(this);

        return PubberSubberStatus.OK;
    }
}