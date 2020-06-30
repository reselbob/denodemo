import {PubberSubberConfigBase} from "../../../base/pubbersubber_config.ts";
import {PubberSubberStatus} from "../../../enums/pubbersubbser_status.ts";
import {IPublisherConfig} from "../interfaces/publisher_config.ts";
import {Utils} from "./utils.ts";

export class PublisherConfigImpl extends PubberSubberConfigBase {
    constructor(config: IPublisherConfig) {
        super(config);
    }

    async validate(): Promise<PubberSubberStatus> {
        Utils.validateCommonPropertiesSync(this);
        return PubberSubberStatus.OK;
    }
}

