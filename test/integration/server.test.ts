import request from "supertest";
import { application, Shutdown } from "../../src/server";

describe("Application", () => {
  afterAll(() => {
    Shutdown();
  });

  it("Starts and has the proper test environment", async () => {
    expect(process.env.NODE_ENV).toBe("test");
    expect(application).toBeDefined();
  }, 10000);
});
