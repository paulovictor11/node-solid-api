import request from "supertest";
import { app } from "../../../app";
import { faker } from "@faker-js/faker";

const userSpy = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(),
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
