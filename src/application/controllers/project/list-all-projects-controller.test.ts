import request from "supertest";
import { app } from "../../../app";

describe("[e2e] List all projects controller", () => {
    it("should return status 200 when valid data is provided", async () => {
        const response = await request(app).get("/projects").send();

        expect(response.status).toBe(200);
        expect(response.body.message).toBeFalsy();
    });
});
