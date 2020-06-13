import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { TestUtils } from './mod.ts';
import {} from '../types/mod.ts'
import {PubberSubberFactory, IPublisherConfig, ISubscriberConfig} from '../types/mod.ts'
import {BackingService} from '../types/mod.ts'
import { PSAmpq } from "../types/providers/amqp.ts";
import { PSRedis } from "../types/providers/redis.ts";

Deno.test({
    name: "Can Init Redis Publisher from Factory",
    ignore: false,
    async fn() {

        const config = new PSRedis.PublisherConfigImpl({
            backingService: BackingService.REDIS,
            source: TestUtils.getRandomString(10)
        })

        const publisher = await PubberSubberFactory.getPublisher(config);
        assertEquals(publisher instanceof PSRedis.Publisher, true);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Can Init Redis Subscriber from Factory",
    ignore: false,
    async fn() {

        const config = new PSRedis.SubscriberConfigImpl({
            backingService: BackingService.REDIS,
            source: TestUtils.getRandomString(10),
            queueName: TestUtils.getRandomString(10)
        } as ISubscriberConfig)

        const subscriber = await PubberSubberFactory.getSubscriber(config);
        assertEquals(subscriber instanceof PSRedis.Subscriber, true);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });


  

  Deno.test({
    name: "Can Init AMPQ Publisher from Factory",
    ignore: false,
    async fn() {

        const config = new PSAmpq.PublisherConfigImpl({
            backingService: BackingService.AMPQ,
            source: TestUtils.getRandomString(10)
        })

        const publisher = await PubberSubberFactory.getPublisher(config);
        assertEquals(publisher instanceof PSAmpq.Publisher, true);

    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Can Init AMPQ Subscriber from Factory",
    ignore: false,
    async fn() {

        const config = new PSAmpq.SubscriberConfigImpl({
            backingService: BackingService.AMPQ,
            source: TestUtils.getRandomString(10),
            queueName: TestUtils.getRandomString(10),
            routingKey: TestUtils.getRandomString(10)
        } as ISubscriberConfig)

        const subscriber = await PubberSubberFactory.getSubscriber(config);
        assertEquals(subscriber instanceof PSAmpq.Subscriber, true);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });
