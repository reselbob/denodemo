import {PubberSubberBase} from "../../../base/pubbersubber.ts";
import {IPublisher} from "../../../interfaces/publisher.ts";
import {Nullable} from "../../../nullable.ts";
import {IPubberSubberConfigBase} from "../../../interfaces/pubbersubber_config_base.ts";
import {PubberSubberStatus} from "../../../enums/pubbersubbser_status.ts";
import {PublisherConfigImpl} from "./publisher_config.ts";

import {connect, AmqpConnection, AmqpChannel} from "https://deno.land/x/amqp/mod.ts";

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