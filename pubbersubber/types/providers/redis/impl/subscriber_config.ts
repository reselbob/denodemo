import {PubberSubberConfigBase} from "../../../base/pubbersubber_config.ts";
import {ISubscriberConfig} from "../../../interfaces/subscriber_config.ts";
import {PubberSubberStatus} from "../../../enums/pubbersubbser_status.ts";
import {Utils} from './utils.ts';

export class SubscriberConfigImpl extends PubberSubberConfigBase
    implements ISubscriberConfig {
    queueName?: string;

    async validate(): Promise<PubberSubberStatus> {
        Utils.validateCommonPropertiesSync(this);
        return PubberSubberStatus.OK;
    }
}