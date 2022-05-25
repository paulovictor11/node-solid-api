import request from "supertest";
import { app } from "../../../app";
import { faker } from "@faker-js/faker";

const projectSpy = async () => {
    await request(app).post("/users").send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(),
    });
    const { body } = await request(app).get("/users").send();

    return {
        title: faker.random.alpha(),
        description: faker.lorem.sentence(),
        userId: body[0]._id,
    };
};

describe("[e2e] Create project controller", () => {
    it("should return status 400 when return an error", async () => {
        const response = await request(app).post("/projects").send();

        expect(response.status).toBe(400);
        expect(response.body.message).toBeTruthy();
    });

    it("should return status 200 when valid data is provided", async () => {
        const project = await projectSpy();
        const response = await request(app).post("/projects").send(project);

        expect(response.status).toBe(201);
        expect(response.body.message).toBeFalsy();
    });
});
