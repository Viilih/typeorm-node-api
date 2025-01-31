// server.test.ts
import request from "supertest";
import { application, Main, Shutdown } from "../../src/server";

describe("Application", () => {
  beforeAll(async () => {
    await Main();
  });

  afterAll(async () => {
    await Shutdown();
  });

  it("Starts and has the proper test environment", async () => {
    expect(process.env.NODE_ENV).toBe("test");
    expect(application).toBeDefined();
  });

  it("Check our healthcheck route", async () => {
    const response = await request(application).get("/main/healthcheck");
    expect(response.status).toBe(200);
  });

  it("Returns 404 when the route requested is not found.", async () => {
    const response = await request(application).get(
      "/a/cute/route/that/does/not/exist/"
    );
    expect(response.status).toBe(404);
  });
});
