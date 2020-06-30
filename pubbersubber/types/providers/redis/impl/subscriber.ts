import {SubscriberBase} from "../../../base/subscriber.ts";
import {Nullable} from "../../../nullable.ts";
import {IPubberSubberConfigBase} from "../../../interfaces/pubbersubber_config_base.ts";
import {PubberSubberStatus} from "../../../enums/pubbersubbser_status.ts";
import {SubscriberConfigImpl} from "./subscriber_config.ts";

import {Utils} from './utils.ts';

import {
    connect,
    RedisCommands,
    RedisSubscription
} from "https://denopkg.com/keroxp/deno-redis/mod.ts";

export class Subscriber extends SubscriberBase {
    queueName?: string;
    subscription: Nullable<RedisSubscription>;

    constructor(config: SubscriberConfigImpl) {
        super(config as IPubberSubberConfigBase);
        this.queueName = config.queueName;
        this.subscription = null;
    }

    async subscribe(handler: Function): Promise<PubberSubberStatus> {
        const sub = await this.connection.subscribe(this.source, handler);

        if (sub) {
            this.subscription = sub;
        } else {
            throw new Error('No subscription invoked.');
        }

        (async function () {
            for await (const {channel, message} of sub.receive()) {
                handler(message);
            }
        })();

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