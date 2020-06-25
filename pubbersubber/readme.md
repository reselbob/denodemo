# PubberSubber

## Objective

The objective of this project is to demonstrate using [Deno](https://www.deno.land) to implement the [Backing Service Pattern](https://12factor.net/backing-services) as defined by 12 Factor App. PubberSubber abstracts the PubSub pattern under two interfaces [IPublisher](./types/interfaces/interfaces/publisher.ts) [ISubscriber](./types/interfaces/interfaces/subscriber.ts)

## Usage

You create implementations of IPublisher and ISubscriber using the class, [PubberSubberFactory](./types/pubbersubber_factory.ts). PubberSubberFactory implements the [Factory Design Pattern](https://en.wikipedia.org/wiki/Factory_method_pattern).

The current version of the PubberSubber supports [Redis](https://redislabs.com/) and [RabbitMQ](https://www.rabbitmq.com/) messaging technology. Use the `enum` values [BackingService.REDIS](./types/providers/redis.ts) or [BackingService.AMPQ](./types/providers/amqp.ts) when configuring the options that get submitted to the factory.

The following is an example of how to create a publisher and subscriber that uses Redis:

```typescript
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import {PSRedis} from "./types/providers/redis.ts";
import {PubberSubberStatus} from './types/enums/pubbersubbser_status.ts'
import {PubberSubberFactory} from './types/pubbersubber_factory.ts';
import {BackingService} from './types/enums/backing_service.ts';
import { PSAmpq } from "./types/providers/amqp.ts";
import { PSRedis } from "./types/providers/redis.ts";

//declare the exchange name
const exchange = "exchange." + v4.generate();
//configure the publisher
const pubfig = new PSRedis.PublisherConfigImpl({
  backingService: BackingService.REDIS,
  source: exchange,
});
//create the publisher
const publisher: IPublisher = await PubberSubberFactory.getPublisher(pubfig);
await publisher.connect();

//configure the subscriber
const subfig = new PSRedis.SubscriberConfigImpl({
  backingService: BackingService.REDIS,
  source: exchange,
});

//create the subscription handler
const handler = (message: string) => {
  const id = v4.generate();
  console.log({ id, message, received: new Date() });
};

const myMessage = "message." + TestUtils.getRandomString(10);
//create the subscriber
const subscriber: ISubscriber = await PubberSubberFactory.getSubscriber(subfig);
await subscriber.connect();
await subscriber.subscribe(handler);
//
// do other stuff
//
//disconnect the subscriber and publisher
await publisher.disconnect();
await subscriber.disconnect();
```
