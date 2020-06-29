import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";
import { TestUtils } from './test_utils.ts';
import {PubberSubberStatus} from '../types/enums/pubbersubbser_status.ts'
import {PubberSubberFactory} from '../types/pubbersubber_factory.ts';
import {BackingService} from '../types/enums/backing_service.ts';
import * as PSAmpq from '../types/providers/amqp/mod.ts';
import * as PSRedis from '../types/providers/redis/mod.ts';
import { delay } from "https://deno.land/std/async/mod.ts";

Deno.test({
    name: "Can Send and Receive AMQP Messages",
    ignore: false,
    async fn() {
        let handlerCalled: boolean = false;
        const message = "message." + TestUtils.getRandomString(10);
        const handler = (args: any, props: any, data: any) => {
            const result = (new TextDecoder().decode(data));
            console.log({id: "AMPQ Send and Receive Test", subcriberResponse:result, received: new Date()});
            handlerCalled  = true
            assertEquals(result.includes(message), true)
        };
        const exchange = 'exchangexx.xx'; //+ TestUtils.getRandomString(10);
        const queue = 'queuexx.xx';// + TestUtils.getRandomString(10);
        const routingKey = 'routingKey.xx';// + //TestUtils.getRandomString(10);
        const pubfig = new PSAmpq.PublisherConfigImpl({
            backingService: BackingService.AMPQ,
            source: exchange
        })

        const publisher = await PubberSubberFactory.getPublisher(pubfig);
        assertEquals(publisher instanceof PSAmpq.Publisher, true);
        let rslt = await publisher.connect();
        assertEquals(rslt, PubberSubberStatus.OK);
       
        const subfig = new PSAmpq.SubscriberConfigImpl({
            backingService: BackingService.AMPQ,
            source: exchange,
            queueName: queue,
            routingKey: routingKey
        });

        await delay(500);
        const subscriber = await PubberSubberFactory.getSubscriber(subfig);
        rslt = await subscriber.connect();
        assertEquals(rslt, PubberSubberStatus.OK);
        rslt = await subscriber.subscribe(handler);
        assertEquals(rslt, PubberSubberStatus.OK);

        await delay(2000);
        rslt = await publisher.publish(message);
        assertEquals(rslt, PubberSubberStatus.OK);

        await delay(2000);
        console.log('shutting down test PSAmpq');
        await publisher.disconnect();
        await subscriber.disconnect();
        assertEquals(handlerCalled, true);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Can Send and Receive Redis Messages",
    ignore: false,
    async fn() {
        let handlerCalled: boolean = false;
        const myMessage = "message." + TestUtils.getRandomString(10);
        const handler = (message: string) => {
            console.log({id: "Redis Send and Receive Test", message, received: new Date()});
            handlerCalled  = true
            assertEquals(myMessage.includes(message), true)
        };

        const exchange = 'exchangexx.xx'; //+ TestUtils.getRandomString(10);
        const pubfig = new PSRedis.PublisherConfigImpl({
            backingService: BackingService.REDIS,
            source: exchange
        })
        const publisher = await PubberSubberFactory.getPublisher(pubfig);
        assertEquals(publisher instanceof PSRedis.Publisher, true);
        let rslt = await publisher.connect();
        assertEquals(rslt, PubberSubberStatus.OK);

        const subfig = new PSRedis.SubscriberConfigImpl({
            backingService: BackingService.REDIS,
            source: exchange,
        });

        await delay(500);
        const subscriber = await PubberSubberFactory.getSubscriber(subfig);
        rslt = await subscriber.connect();
        assertEquals(rslt, PubberSubberStatus.OK);
        rslt = await subscriber.subscribe(handler);
        assertEquals(rslt, PubberSubberStatus.OK);

        await delay(2000);
        rslt = await publisher.publish(myMessage);
        assertEquals(rslt, PubberSubberStatus.OK);

        await delay(2000);
        console.log('shutting down test PSRedis');
        await publisher.disconnect();
        await subscriber.disconnect();
        assertEquals(handlerCalled, true);

    },
    sanitizeResources: false,
    sanitizeOps: false,
  });