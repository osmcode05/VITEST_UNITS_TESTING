// ================ ** Testing Async Functions ** ================
// When testing async code, you must make sure the test waits for the async work to finish Because Vitest doesn’t wait.
// There are Two principal ways to test async functions (Vitest):
// 1. Using async / await (BEST & MOST USED)
// 2. Using .resolves / .rejects (Promise matcher)

import { describe, it, expect, vi } from "vitest";
import { loadPrayerTimes } from "../src/LoadPrayerTimes";

describe("Test loadPrayerTimes function", () => {
  it("should return an object containing the five obligatory prayer times if request is successful", async () => {
    const result = await loadPrayerTimes("Morocco", "Agadir");
    expect(result).toBeTypeOf("object");
    expect(Object.keys(result)).toHaveLength(5);
    expect(result).toEqual(
      expect.objectContaining({
        Fajr: expect.any(String),
        Dhuhr: expect.stringContaining(":"),
        Asr: expect.any(String),
        Maghrib: expect.stringContaining(":"),
        Isha: expect.any(String),
      }),
    );
  });

  it('should return an error if there are a probleme whit api"', async () => {
    await expect(loadPrayerTimes("InvalidCountry", "InvalidCity")).rejects.toThrow();
  });

  it.each([
    ["morocco", null],
    [123, "Cairo"],
    [true, null],
    [undefined, false],
  ])(
    "should receive an error if the inputs are Invalid like : %s and %s", async (Country, City) => {
      expect(() => loadPrayerTimes(Country, City)).toThrow("Invalid inputs");
    },
  );
});

// 🔴 Problems:
// -- Makes real internet call
// -- Slow
// -- Fails if offline
// -- Not controlled

// ================ ** Mocking Async Functions ** ================

// 🟢 Benefits:
// -- Faster
// -- Controlled
// -- Doesn’t require internet connection
// -- Can simulate different scenarios (success, error, etc.)

describe("Mocking loadPrayerTimes function", () => {
  it("should return mocked prayer times", async () => {

    const mockPrayerTimes = {
      Fajr: "05:00",
      Dhuhr: "12:00",
      Asr: "15:00",
      Maghrib: "18:00",
      Isha: "20:00",
    };

    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      json: () => Promise.resolve({
        data: {timings: mockPrayerTimes}
      }),
    });

    const result = await loadPrayerTimes("Morocco", "Agadir");
    expect(result).toEqual(mockPrayerTimes);
    expect(global.fetch).toHaveBeenCalledWith("https://api.aladhan.com/v1/timingsByCity?city=Agadir&country=Morocco");
  });

  it("should return an error when the mocked function is rejected", async () => {

    global.fetch = vi.fn().mockResolvedValue({
      status: 500,
    });
    
    await expect(loadPrayerTimes("InvalidCountry", "InvalidCity")).rejects.toThrow("Request failed whit status :500");
  });

});

// Go to mocking.test.js for mor examples of mocking async functions. 