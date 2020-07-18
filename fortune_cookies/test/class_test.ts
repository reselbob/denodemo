import { assertEquals} from "https://deno.land/std@0.60.0/testing/asserts.ts";
import {TestUtils} from './test_utils.ts'
import { FortuneCookiePhoneImpl } from "../fortune_cookie_phone-impl.ts";
import { SendStatus, ISenderSearchOptions } from "../interface.ts";
import { DataManager } from "../data/data_manager.ts";
import { FortuneCookiesEmailImpl } from "../fortune_cookie_email_impl.ts";

Deno.test({
    name: "Can Send Fortune to New Customer as SMS",
    ignore: false,
    async fn() {
        //create a new customer
        const customer = TestUtils.getRandomCustomer();
        const sender = new FortuneCookiePhoneImpl()
        //send the fortune to the new customer
        const result = await sender.sendFortune(customer);
        //verify the status
        assertEquals(result, SendStatus.OK)
        //make sure the new customer is there
        const arr = DataManager.getFortunesSync();
        const c = await DataManager.searchCustomer({phone:customer.phone })
        assertEquals(result, SendStatus.OK)
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Can Send Fortune to New Customer as Email",
    ignore: false,
    async fn() {
        //create a new customer
        const customer = TestUtils.getRandomCustomer();
        const sender = new FortuneCookiesEmailImpl()
        //send the fortune to the new customer
        const result = await sender.sendFortune(customer);
        //verify the status
        assertEquals(result, SendStatus.OK)
        //make sure the new customer is there
        const arr = DataManager.getFortunesSync();
        const c = await DataManager.searchCustomer({email:customer.email })
        assertEquals(result, SendStatus.OK)
    },
    sanitizeResources: false,
    sanitizeOps: false,
});