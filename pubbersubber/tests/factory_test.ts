import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { TestUtils } from './mod.ts';
import {} from '../types/mod.ts'
import {PubberSubberFactory, IPublisherConfig, ISubscriberConfig} from '../types/mod.ts'
import {BackingService} from '../types/mod.ts'
import { Ampq } from "../types/providers/amqp.ts";
import { Redis } from "../types/providers/redis.ts";

Deno.test({
    name: "Can Init Redis Publisher from Factory",
    ignore: false,
    async fn() {

        const config = new Redis.PublisherConfigImpl({
            backingService: BackingService.REDIS,
            source: TestUtils.getRandomString(10)
        })

        const publisher = await PubberSubberFactory.getPublisher(config);
        assertEquals(publisher instanceof Redis.Publisher, true);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Can Init Redis Subscriber from Factory",
    ignore: false,
    async fn() {

        const config = new Redis.SubscriberConfigImpl({
            backingService: BackingService.REDIS,
            source: TestUtils.getRandomString(10),
            queueName: TestUtils.getRandomString(10)
        } as ISubscriberConfig)

        const subscriber = await PubberSubberFactory.getSubscriber(config);
        assertEquals(subscriber instanceof Redis.Subscriber, true);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });


  

  Deno.test({
    name: "Can Init AMPQ Publisher from Factory",
    ignore: false,
    async fn() {

        const config = new Redis.PublisherConfigImpl({
            backingService: BackingService.AMPQ,
            source: TestUtils.getRandomString(10)
        })

        const publisher = await PubberSubberFactory.getPublisher(config);
        assertEquals(publisher instanceof Ampq.Publisher, true);

    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Can Init AMPQ Subscriber from Factory",
    ignore: false,
    async fn() {

        const config = new Ampq.SubscriberConfigImpl({
            backingService: BackingService.AMPQ,
            source: TestUtils.getRandomString(10),
            queueName: TestUtils.getRandomString(10)
        } as ISubscriberConfig)

        const subscriber = await PubberSubberFactory.getSubscriber(config);
        assertEquals(subscriber instanceof Ampq.Subscriber, true);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });
