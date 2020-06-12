import {IPublisher, SubscriberBase} from './../pubbersubber.ts';
import {PubberSubberBase} from "./../mod.ts";
import {PubberSubberConfigBase, IPubberSubberConfigBase} from "./../mod.ts";
import {PubberSubberStatus, ISubscriberConfig} from "./../mod.ts";
import {Nullable} from "./../mod.ts";

import {connect, AmqpConnection, AmqpChannel} from "https://deno.land/x/amqp/mod.ts";

export namespace Ampq {
    export interface IPublisherConfig extends IPubberSubberConfigBase {
    }

    export class PublisherConfigImpl extends PubberSubberConfigBase {
        constructor(config: SubscriberConfigImpl) {
            super(config as IPubberSubberConfigBase);
        }


        async validate(): Promise<PubberSubberStatus> {
            Utils.validateCommonPropertiesSync(this);
            /*
            this.port = this.port || 5679;
            this.host = this.host || 'localhost';
            this.password = this.password || 'guest';
            this.userName = this.userName || 'guest'
            if (this.source) throw new Error('No source defined')
            */
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
        /*
        public InitializeAsync = async (config: PublisherConfigImpl) => {
            config.validate();
        }
        */
        async publish(message: string): Promise<PubberSubberStatus> {
            const url = `amqp://${this.userName}:${this.password}@${this.host}:${this.port}`
            if(!this.connection){
                this.connection = await connect(url);
                this.channel = await this.connection.openChannel();
                await this.channel.declareExchange({exchange: this.source, type: "fanout"});
            }
            if(this.channel){
                await this.channel.publish(
                    {exchange:this.source},
                    {contentType: "application/json"},
                    new TextEncoder().encode(JSON.stringify({message})),
                );
            }
            return PubberSubberStatus.OK
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
        queueName?: string;
        constructor(config: ISubscriberConfig){
            super(config);
            //this.queueName = config.queueName;
            
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

        async subscribe(handler: Function): Promise<PubberSubberStatus> {
            const url = `amqp://${this.userName}:${this.password}@${this.host}:${this.port}`
            if(!this.connection){
                this.connection = await connect(url);
                this.channel = await this.connection.openChannel();
                this.channel.declareQueue({queue: this.queueName, autoDelete: false });

                //bind it to the exchange
                try{await  this.channel.bindQueue({ exchange: this.source, queue: this.queueName, routingKey: this.routingKey });
                }catch(err) {
                    throw(err);
                }
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
            source.port = source.port || 5679;
            source.host = source.host || 'localhost';
            source.password = source.password || 'guest';
            source.userName = source.userName || 'guest'
        }
    }
}
