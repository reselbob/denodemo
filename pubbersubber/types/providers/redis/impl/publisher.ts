import {PubberSubberBase} from "../../../base/pubbersubber.ts";
import {IPubberSubberConfigBase} from "../../../interfaces/pubbersubber_config_base.ts";
import {PubberSubberStatus} from "../../../enums/pubbersubbser_status.ts";
import {PublisherConfigImpl} from "./publisher_config.ts";
import {Utils} from './utils.ts';

import {connect, RedisCommands} from "https://denopkg.com/keroxp/deno-redis/mod.ts";

export class Publisher extends PubberSubberBase {
    constructor(config: PublisherConfigImpl) {
        super(config as IPubberSubberConfigBase);
    }

    async publish(message: string): Promise<PubberSubberStatus> {
        this.connection.publish(this.source, message);
        return PubberSubberStatus.OK;
    }

    async connect(): Promise<PubberSubberStatus> {
        const config = Utils.getRediConfig(this);
        this.connection = await connect(config) as RedisCommands;
        return PubberSubberStatus.OK;
    }

    async disconnect(): Promise<PubberSubberStatus> {
        this.connection.close();
        return PubberSubberStatus.OK;
    }
}