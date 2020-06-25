import {Nullable} from '../nullable.ts';
import {PubberSubberBase} from '../base/pubbersubber.ts';
import {SubscriberBase} from '../base/subscriber.ts'

import {PublisherBase} from '../base/publisher.ts';
import {PubberSubberConfigBase} from '../base/pubbersubber_config.ts'
import {IPubberSubberConfigBase} from '../interfaces/pubbersubber_config_base.ts'

import {ISubscriberConfig} from '../interfaces/subscriber_config.ts';
import {PubberSubberStatus} from '../enums/pubbersubbser_status.ts'

import {
    connect,
    RedisCommands,
    RedisSubscription,
    RedisConnectOptions,
    ConnectionClosedError
} from "https://denopkg.com/keroxp/deno-redis/mod.ts";

export namespace PSRedis {
    export interface IPublisherConfig extends IPubberSubberConfigBase {
    }

    export class PublisherConfigImpl extends PubberSubberConfigBase implements IPublisherConfig {
        async validate(): Promise<PubberSubberStatus> {
            Utils.validateCommonPropertiesSync(this);
            return PubberSubberStatus.OK;
        }
    }

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


    export class SubscriberConfigImpl extends PubberSubberConfigBase
        implements ISubscriberConfig {
        queueName?: string;

        async validate(): Promise<PubberSubberStatus> {
            Utils.validateCommonPropertiesSync(this);
            return PubberSubberStatus.OK;
        }
    }

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

    class Utils {
        static validateCommonPropertiesSync(source: any): void {
            if (!source.source) throw new Error('No source defined');
            source.port = source.port || 6379;
            source.host = source.host || '127.0.0.1';
            source.password = source.password || '';
            source.userName = source.userName || '';
        }

        static getRediConfig(source: any): RedisConnectOptions {
            let obj = null;
            if (source.password.length > 0) {
                obj = {
                    hostname: source.host as string,
                    port: source.port,
                    password: source.password as string
                };
            } else {
                obj = {
                    hostname: source.host as string,
                    port: source.port,
                };
            }
            return obj as RedisConnectOptions;

        }
    }
}