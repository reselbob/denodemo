import { assertEquals } from "https://deno.land/std@0.60.0/testing/asserts.ts";

Deno.test({
    name: "Can add from API",
    ignore: false,
    async fn() {
        const url = `http://127.0.0.1:7700/sum/8,4,3`
        await fetch(url)
        .then((response) => {
            return response.text()
        })
        .then(data => {
            assertEquals(Number(data), 15);
        })
    },
  });

  Deno.test({
    name: "Can subtract from API",
    ignore: false,
    async fn() {
        const url = `http://127.0.0.1:7700/difference/1,1`
        await fetch(url)
        .then((response) => {
            return response.text()
        })
        .then(data => {
            assertEquals(Number(data), 0);
        })
    },
  });

  Deno.test({
    name: "Can multiply from API",
    ignore: false,
    async fn() {
        const url = `http://127.0.0.1:7700/product/10,2`
        await fetch(url)
        .then((response) => {
            return response.text()
        })
        .then(data => {
            assertEquals(Number(data), 20);
        })
    },
  });

  Deno.test({
    name: "Can divide from API",
    ignore: false,
    async fn() {
        const url = `http://127.0.0.1:7700/quotient/10,2`
        await fetch(url)
        .then((response) => {
            return response.text()
        })
        .then(data => {
            assertEquals(Number(data),5);
        })
    },
  });