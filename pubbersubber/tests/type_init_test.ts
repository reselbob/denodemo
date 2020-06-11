import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { TestUtils } from './mod.ts';
import {Subscriber, PubberSubberStatus, Publisher} from '../types/mod.ts'
import {IPublisherConfig, ISubscriberConfig} from '../types/mod.ts'
import {BackingService} from '../types/mod.ts'

Deno.test({
    name: "Can Init Publisher",
    ignore: false,
    async fn() {
        const config: IPublisherConfig = {
            backingService: BackingService.REDIS,
            source: TestUtils.getRandomString(10)
        }

        const publisher = new Publisher(config)
        assertEquals(publisher instanceof Publisher, true);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Can Init Subscriber",
    ignore: false,
    async fn() {
        const config: ISubscriberConfig = {
            backingService: BackingService.REDIS,
            source: TestUtils.getRandomString(10),
            queueName: TestUtils.getRandomString(10)
        }

        const subscriber = new Subscriber(config)
        assertEquals(subscriber instanceof Subscriber, true);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });
