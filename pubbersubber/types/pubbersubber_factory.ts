import { IPublisherConfig, ISubscriberConfig } from "./mod.ts";
import { BackingService } from "./backing_service.ts";
import { PSAmpq } from "./providers/amqp.ts";
import { PSRedis } from "./providers/redis.ts";
import { IPublisher, ISubscriber } from "./pubbersubber.ts";

export class PubberSubberFactory {
  constructor() {
  }
  static async getPublisher(config: PSAmpq.PublisherConfigImpl): Promise<IPublisher> {
    let publisher: IPublisher;
    switch (config.backingService) {
      case BackingService.AMPQ:
        publisher = new PSAmpq.Publisher(config);
        break;
      case BackingService.REDIS:
        publisher = new PSRedis.Publisher(config);
        break;
      default:
        throw new Error(
          `Backing service ${config.backingService} is not supported`,
        );
    }

    return publisher;
  }

  static async getSubscriber(config: ISubscriberConfig): Promise<ISubscriber> {
    let subscriber: ISubscriber;
    switch (config.backingService) {
      case BackingService.AMPQ:
        subscriber = new PSAmpq.Subscriber(config as PSAmpq.SubscriberConfigImpl);
        break;
      case BackingService.REDIS:
        subscriber = new PSRedis.Subscriber(config as PSRedis.SubscriberConfigImpl);
        break;
      default:
        throw new Error(
          `Backing service ${config.backingService} is not supported`,
        );
    }

    return subscriber;
  }
}
