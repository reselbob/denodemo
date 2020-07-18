import { Calculator } from "./../calculator.ts";
import { assertEquals } from "https://deno.land/std@0.60.0/testing/asserts.ts";

Deno.test({
  name: "Can add",
  ignore: false,
  async fn() {
    const result = Calculator.add([1, 2, 3]);
    assertEquals(result, 6);
  },
});

Deno.test({
    name: "Can subtract",
    ignore: false,
    async fn() {
      const result = Calculator.subtract([1, 2, 3]);
      assertEquals(result, -5);
    },
  });

  Deno.test({
    name: "Can multiple",
    ignore: false,
    async fn() {
      const result = Calculator.multiply([1, 2, 3]);
      assertEquals(result, 6);
    },
  });

  Deno.test({
    name: "Can divide",
    ignore: false,
    async fn() {
      const result = Calculator.divide([10, 4]);
      assertEquals(result, 2.5);
    },
  });