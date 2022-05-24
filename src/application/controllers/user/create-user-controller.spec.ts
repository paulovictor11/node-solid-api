import request from "supertest";
import { app } from "../../../app";

const userSpy = {
    name: "Test",
    email: "test@email.com",
    password: "12345",
};

describe("[e2e] Create user controller", () => {
    it("should return status 400 when return an error", async () => {
        const response = await request(app).post("/users").send();

        expect(response.status).toBe(400);
        expect(response.body.message).toBeTruthy();
    });

    it("should return status 200 when valid data is provided", async () => {
        const response = await request(app).post("/users").send(userSpy);

        expect(response.status).toBe(201);
        expect(response.body.message).toBeFalsy();
    });
});
