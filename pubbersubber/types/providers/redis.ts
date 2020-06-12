import { PubberSubberBase,SubscriberBase, PublisherBase } from "./../mod.ts";
import { PubberSubberConfigBase, IPubberSubberConfigBase, ISubscriberConfig } from "./../mod.ts";
import { PubberSubberStatus } from "./../mod.ts";

export namespace Redis {
  export interface IPublisherConfig extends IPubberSubberConfigBase {}

  export class PublisherConfigImpl extends PubberSubberConfigBase implements IPublisherConfig{
    async validate(): Promise<PubberSubberStatus> {
      return PubberSubberStatus.ERROR;
    }
  }

  export class Publisher extends PubberSubberBase {
    constructor(config: PublisherConfigImpl) {
      super(config as IPubberSubberConfigBase);
      config.validate();
    }

    async publish(message: string): Promise<PubberSubberStatus> {
        return PubberSubberStatus.ERROR;
    }

    async disconnect(): Promise<PubberSubberStatus> {
      return PubberSubberStatus.ERROR;
    }
  }


  export class SubscriberConfigImpl extends PubberSubberConfigBase
    implements ISubscriberConfig {
    queueName?: string;
    async validate(): Promise<PubberSubberStatus> {
      return PubberSubberStatus.ERROR;
    }
  }

  export class Subscriber extends SubscriberBase {
    queueName?: string;
    constructor(config: SubscriberConfigImpl) {
      super(config as IPubberSubberConfigBase);
      this.queueName = config.queueName;
      config.validate();
    }

    async subscribe(handler: Function): Promise<PubberSubberStatus> {
        return PubberSubberStatus.ERROR;
    }

    async disconnect(): Promise<PubberSubberStatus> {
      return PubberSubberStatus.ERROR;
    }
  }
}
