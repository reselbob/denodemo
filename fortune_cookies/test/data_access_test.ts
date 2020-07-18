import { ICustomer } from './../interface.ts';
import { assertEquals, assertNotEquals } from "https://deno.land/std@0.60.0/testing/asserts.ts";
import {DataManager} from '../data/data_manager.ts'
import {TestUtils} from './test_utils.ts'

Deno.test({
    name: "Can parse fortunes",
    ignore: false,
    async fn() {
        const arr = DataManager.getFortunesSync();
        assertEquals(Array.isArray(arr), true)
        assertEquals(arr.length > 500, true)
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Can get random fortunes",
    ignore: false,
    async fn() {
        const fortune1 = DataManager.getFortuneSync();
        const fortune2 = DataManager.getFortuneSync();
        assertNotEquals(fortune1, fortune2)
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Can write and read a customer",
    ignore: false,
    async fn() {
        const firstName = TestUtils.getRandomString(5);
        const lastName = TestUtils.getRandomString(10);
        const email = `${firstName}@${lastName}.com`;
        const phone = TestUtils.getRandomPhone();
        const customer: ICustomer = {
            firstName,
            lastName,
            email,
            phone
        }
        const id = await DataManager.setCustomer(customer);
        assertNotEquals(id, '');
        const result = await DataManager.getCustomer(id);
        assertEquals(id, result.id);
        assertEquals(customer.firstName, result.firstName);
        assertEquals(customer.lastName, result.lastName);
        assertEquals(customer.email, result.email);
        assertEquals(customer.phone, result.phone);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });