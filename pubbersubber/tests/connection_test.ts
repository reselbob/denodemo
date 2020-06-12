import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";

import { TestUtils } from './mod.ts';
import {PubberSubberFactory, IPublisherConfig, ISubscriberConfig, PubberSubberStatus} from '../types/mod.ts'
import {BackingService} from '../types/mod.ts'
import { Ampq } from "../types/providers/amqp.ts";
import { Redis } from "../types/providers/redis.ts";
import { delay } from "https://deno.land/std/async/mod.ts";

Deno.test({
    name: "Can Send and Receive AMQP Messages",
    ignore: false,
    async fn() {
        const message = "message." + TestUtils.getRandomString(10);
        const handler = (args: any, props: any, data: any) => {
            const result = (new TextDecoder().decode(data));
            console.log({id: "Send and Receive Test", subcriberResponse:result, received: new Date()});
            assertEquals(result.includes(message), true)
        };
        const exchange = 'exchange.' + TestUtils.getRandomString(10);
        const queue = 'queue.' + TestUtils.getRandomString(10);
        const routingKey = 'routingKey.' + TestUtils.getRandomString(10);
        const pubfig = new Ampq.PublisherConfigImpl({
            backingService: BackingService.AMPQ,
            source: exchange
        })

        const publisher = await PubberSubberFactory.getPublisher(pubfig);
        assertEquals(publisher instanceof Ampq.Publisher, true);

        const subfig = new Ampq.SubscriberConfigImpl({
            backingService: BackingService.AMPQ,
            source: exchange,
            queueName: queue,
            routingKey: routingKey
        });

        const subscriber = await PubberSubberFactory.getSubscriber(subfig);

        let rslt = await publisher.publish(message);
        assertEquals(rslt, PubberSubberStatus.OK);
        await delay(500);
        rslt = await subscriber.subscribe(handler);
        assertEquals(rslt, PubberSubberStatus.OK);

        await publisher.disconnect();
        await subscriber.disconnect();
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });