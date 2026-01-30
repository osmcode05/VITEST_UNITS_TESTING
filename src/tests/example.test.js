import { describe, it, expect, test } from "vitest";
import { GetLongStreng, isPrime, Factorial } from "../example";

// ** describe ** : used to group related tests together

// ** it ** : used to define a single test case

// ** test ** : used to define a test with multiple data sets (test do the same as it)

// ** expect ** : creates assertions to verify expected test output

// ** each ** : used to run the same test multiple times with different data.
// lets you write one test, then execute it many times with different inputs and expected results.


// ================== Test StinLongtest functing ==================
describe("Test StinLongtest functing ", () => {
  it("should retun the longest string", () => {
    expect(GetLongStreng("osm", "lolo")).toBe("lolo");
  });

  it("should retun equal msg if the two string are equal", () => {
    expect(GetLongStreng("osm", "moh")).toBe("the two string are equal");
  });

  it("handel empty inputs by retun empty msg", () => {
    expect(GetLongStreng("", "moh")).toBe(
      "one or more of the input are empty plz complete all inputs",
    );
    expect(GetLongStreng("osm", "")).toBe(
      "one or more of the input are empty plz complete all inputs",
    );
    expect(GetLongStreng("", "")).toBe(
      "one or more of the input are empty plz complete all inputs",
    );
  });
});

// ================== Test isPrime Function ==================
describe("Test isPrime functing ", () => {
  it("should return TRUE if number is prime and the FALSE if not", () => {
    expect(isPrime(53)).toBeTruthy();
    expect(isPrime(81)).toBeFalsy();
  });

  it("should retun FALSE if the input not a number or Number lowest than 1 or integer num ", () => {
    expect(isPrime("17")).toBeFalsy();
    expect(isPrime(-6)).toBeFalsy();
    expect(isPrime(2.5)).toBeFalsy();
  });
});

// ================== Test various matchers ==================

// basic matchers
expect("Hello").toBe("Hello"); // result should be Hello
expect("Hello").toEqual("Hello"); // result should Equal Hello
expect("Worlds").not.toBe("osm"); // result should not be true
expect(true).toBeTruthy(); // result should be true
expect(false).toBeFalsy(); // result should be false
expect().toBeUndefined(); // result should be undefined
expect(42).toBeDefined(); // result should be defined (toBeDefined() === not.toBeUndefined())
expect(null).toBeNull(); // result should be null
expect(() => {
  throw new Error("error");
}).toThrow(); // result should throw an error
expect(isPrime("FFF")).toBeTypeOf("boolean"); // result should be of type boolean

// number matchers
expect(5 + 5).toEqual(10); // result should equal 10
expect(5).toBeGreaterThan(3); // result should be greater than 3
expect(5).toBeGreaterThanOrEqual(5); // result should be greater than or equal to 5
expect(3).toBeLessThan(5); // result should be less than 5
expect(3).toBeLessThanOrEqual(3); // result should be less than or equal to 3
expect(0.1 + 0.2).toBeCloseTo(0.3); // result should be close to 0.3

// array and string matchers
let arr = [1, 2, 3, 4, 5];
expect(arr.map((n) => isPrime(n))).toEqual([false, true, true, false, true]); // result should be [false, true, true, false, true]
expect("hello world").toContain("world"); // result should contain "world"
expect(arr).toContain(2); // result should contain 2
expect(arr).toHaveLength(5); // result should have length of 5
expect(arr).not.toContain(7); // result should not contain 7

// object matchers
let obj = { name: "osm", age: 30 };
expect(obj).toEqual({ name: "osm", age: 30 }); // result should be equal objects
expect(obj).toMatchObject({ name: "osm" }); // result should match object with name property
expect(obj).not.toMatchObject({ age: 25 }); // result should not match object with age 25
expect(obj).toHaveProperty("name"); // result should have property "name"

// ================== Test factorial function ==================

  test.each([
    ['osm', undefined],
    [-5, undefined],
    [0, 1],
    [1, 1],
    [3, 6],
  ])("Factorial(%s) = %s", (input, expected) => {
    expect(Factorial(input)).toBe(expected);
  });

  // ** %s ** : is a placeholder for string values in the test name.
  // Ex : test.each([["hello", "hello"], ["world", "world"]])("echo(%s) = %s", (input, expected) => { ... })
  // This will create two tests : echo(hello) = hello and echo(world) = world
  // This makes it easier to identify which test case is running and what the input and expected output are.