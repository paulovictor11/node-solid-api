import request from "supertest";
import { app } from "../../../app";
import { faker } from "@faker-js/faker";

const userSpy = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(),
};

describe("[e2e] Update user controller", () => {
    it("should return status 400 when return an error", async () => {
        const response = await request(app).put("/user/1").send();

        expect(response.status).toBe(400);
        expect(response.body.message).toBeTruthy();
    });

    it("should return status 200 when valid data is provided", async () => {
        await request(app).post("/users").send(userSpy);
        const { body } = await request(app).get("/users").send();
        const userId = body[0]._id;

        const response = await request(app)
            .put(`/user/${userId}`)
            .send({
                ...userSpy,
                email: "test2@email.com",
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBeFalsy();
    });
});
