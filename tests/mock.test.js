import { describe, it, expect, vi } from "vitest";
import { getUser, fetchPost } from "../src/mocking";
import axios from "axios";

// Mocking : Replace the real network request with a fake function that returns controlled data.
// Mock what your function depends on — not the function itself.


// =============== GetUser function using axios ===============

vi.mock("axios"); // Mock axios module

describe("getUser", () => {
  it("getUser returns mocked user", async () => {
    // 1️)- Tell fake axios what to return
    axios.get.mockResolvedValue({
      data: { id: 1, username: "Bret" },
    });

    // 2️)- Call the function
    const user = await getUser(1);

    // 3️)- Assertions
    expect(axios.get).toHaveBeenCalled(); // Check if axios.get was called
    expect(axios.get).toHaveBeenCalledTimes(1); // Check if axios.get was called exactly once
    expect(axios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/1"); // Check if axios.get was called with the correct URL
    expect(user.username).toBe("Bret");
  });

  it("getUser throws error", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    await expect(getUser(1)).rejects.toThrow("Network error");
  });
});

// =============== fetchPost function using fetch API ===============

describe("fetchPost", () => {
  it("fetchPost returns mocked post", async () => {

    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      json: () => Promise.resolve({ id: 1, title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit" }),
    });

    const post = await fetchPost(1);

    expect(global.fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts/1");
    expect(post.title).toBe("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
  });

  it("fetchPost throws error", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Error fetching post"));
    
    await expect(fetchPost(1)).rejects.toThrow("Error fetching post");
  });
});