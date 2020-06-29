import { IPublisherConfig} from '../types/interfaces/publisher_config.ts' ;
import  {ISubscriberConfig} from '../types/interfaces/subscriber_config.ts';
import { BackingService } from "./enums/backing_service.ts";
import * as PSAmpq from './providers/amqp/mod.ts';
import * as PSRedis from './providers/redis/mod.ts';
import {IPublisher} from "./interfaces/publisher.ts";
import {ISubscriber} from "./interfaces/subscriber.ts";

export class PubberSubberFactory {
  constructor() {
  }
  static async getPublisher(config: IPublisherConfig): Promise<IPublisher> {
    let publisher: IPublisher;
    switch (config.backingService) {
      case BackingService.AMPQ:
        publisher = new PSAmpq.Publisher(config as PSAmpq.PublisherConfigImpl) ;
        break;
      case BackingService.REDIS:
        publisher = new PSRedis.Publisher(config as PSRedis.PublisherConfigImpl);
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
