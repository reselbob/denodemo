import {SubscriberBase} from "../../../base/subscriber.ts";
import {Nullable} from "../../../nullable.ts";
import {IPubberSubberConfigBase} from "../../../interfaces/pubbersubber_config_base.ts";
import {PubberSubberStatus} from "../../../enums/pubbersubbser_status.ts";
import {SubscriberConfigImpl} from "./subscriber_config.ts";
import {connect, AmqpConnection, AmqpChannel} from "https://deno.land/x/amqp/mod.ts";

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