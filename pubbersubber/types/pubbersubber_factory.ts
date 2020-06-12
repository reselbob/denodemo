import { IPublisherConfig, ISubscriberConfig } from "./mod.ts";
import { BackingService } from "./backing_service.ts";
import { Ampq } from "./providers/amqp.ts";
import { Redis } from "./providers/redis.ts";
import { IPublisher, ISubscriber } from "./pubbersubber.ts";

export class PubberSubberFactory {
  constructor() {
  }
  static async getPublisher(config: Ampq.PublisherConfigImpl): Promise<IPublisher> {
    let publisher: IPublisher;
    switch (config.backingService) {
      case BackingService.AMPQ:
        publisher = new Ampq.Publisher(config);
        break;
      case BackingService.REDIS:
        publisher = new Redis.Publisher(config);
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
        subscriber = new Ampq.Subscriber(config as Ampq.SubscriberConfigImpl);
        break;
      case BackingService.REDIS:
        subscriber = new Redis.Subscriber(config as Redis.SubscriberConfigImpl);
        break;
      default:
        throw new Error(
          `Backing service ${config.backingService} is not supported`,
        );
    }

    return subscriber;
  }
}
