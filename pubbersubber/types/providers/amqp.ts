import {IPublisher} from '../interfaces/publisher.ts';
import {SubscriberBase} from '../base/subscriber.ts'
import {PubberSubberBase} from '../base/pubbersubber.ts';
import {PubberSubberConfigBase} from '../base/pubbersubber_config.ts'
import {IPubberSubberConfigBase} from '../interfaces/pubbersubber_config_base.ts';
import {PubberSubberStatus,} from '../enums/pubbersubbser_status.ts';
import { ISubscriberConfig} from '../interfaces/subscriber_config.ts'
import {Nullable} from '../nullable.ts';

import {connect, AmqpConnection, AmqpChannel} from "https://deno.land/x/amqp/mod.ts";

export namespace PSAmpq {
    export interface IPublisherConfig extends IPubberSubberConfigBase {
    }

    export class PublisherConfigImpl extends PubberSubberConfigBase {
        constructor(config: IPublisherConfig) {
            super(config);
        }

        async validate(): Promise<PubberSubberStatus> {
            Utils.validateCommonPropertiesSync(this);
            return PubberSubberStatus.OK;
        }
    }

    export class Publisher extends PubberSubberBase implements IPublisher {
        connection: Nullable<AmqpConnection>;
        channel: Nullable<AmqpChannel>
        constructor(config: PublisherConfigImpl) {
            super(config as IPubberSubberConfigBase);
            this.connection = null;
            this.channel = null;
        }
        async publish(message: string): Promise<PubberSubberStatus> {
            if(this.channel){
                await this.channel.publish(
                    {exchange:this.source},
                    {contentType: "application/json"},
                    new TextEncoder().encode(JSON.stringify({message})),
                );
            }
            return PubberSubberStatus.OK
        }
        async connect(){
            const uri = `amqp://${this.userName}:${this.password}@${this.host}:${this.port}`
            if(!this.connection){
                this.connection = await connect(uri);
                this.channel = await this.connection.openChannel();
                await this.channel.declareExchange({exchange: this.source, type: "fanout"});
            }
            return PubberSubberStatus.OK;
        }
        async disconnect(): Promise<PubberSubberStatus> {
            if (this.connection) {
                await this.connection.close()
            }
            return PubberSubberStatus.OK;
        }
    }

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

    export class Subscriber extends SubscriberBase {
        connection: Nullable<AmqpConnection>;
        channel: Nullable<AmqpChannel>
        queueName?: string;

        constructor(config: SubscriberConfigImpl) {
            super(config as IPubberSubberConfigBase);
            this.queueName = config.queueName;
            this.connection = null;
            this.channel = null;
        }

        async connect(){
            const uri = `amqp://${this.userName}:${this.password}@${this.host}:${this.port}`;
            if(!this.connection){
                this.connection = await connect(uri);
                this.channel = await this.connection.openChannel();
                this.channel.declareQueue({queue: this.queueName, autoDelete: false });
                //bind it to the exchange
                await this.channel.bindQueue({ exchange: this.source, queue: this.queueName, routingKey: this.routingKey});
            }
            return PubberSubberStatus.OK;

        }

        async subscribe(handler: Function): Promise<PubberSubberStatus> {
            if(!this.channel) throw new Error('Channel not initialized');
            await  this.channel.consume(
                {queue: this.queueName},
                async (args, props, data) => {
                    await handler(args, props, data);
                    if(this.channel){
                        await  this.channel.ack({ deliveryTag: args.deliveryTag });
                    }else{
                        throw new Error('No channel in force');
                    }
                },
            );
            return PubberSubberStatus.OK;
        }

        async disconnect(): Promise<PubberSubberStatus> {
            if (this.connection) {
                await this.connection.close()
            }
            return PubberSubberStatus.OK;
        }
    }

    class Utils {
        static validateCommonPropertiesSync(source: any): void {
            if(!source.source) throw new Error('No source defined');
            source.port = source.port || 5672;
            source.host = source.host || 'localhost';
            source.password = source.password || 'guest';
            source.userName = source.userName || 'guest';
        }
    }
}