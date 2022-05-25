import request from "supertest";
import { app } from "../../../app";
import { Project } from "../../../domain/project";
import { faker } from "@faker-js/faker";

const projectSpy = async () => {
    await request(app).post("/users").send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(),
    });
    const { body: userBody } = await request(app).get("/users").send();

    await request(app).post("/projects").send({
        title: faker.random.alpha(),
        description: faker.lorem.sentence(),
        userId: userBody[0]._id,
    });
    const { body } = await request(app).get("/projects").send();

    return new Project(body[0].props, body[0]._id);
};

const taskSpy = async () => {
    const { id, userId } = await projectSpy();
    return {
        title: faker.random.alpha(),
        projectId: id,
        assignedTo: userId,
        completed: false,
    };
};

describe("[e2e] Create task controller", () => {
    it("should return status 400 when return an error", async () => {
        const response = await request(app).post("/tasks").send();

        expect(response.status).toBe(400);
        expect(response.body.message).toBeTruthy();
    });

    it("should return status 200 when valid data is provided", async () => {
        const tasks = await taskSpy();
        const response = await request(app).post("/tasks").send(tasks);

        expect(response.status).toBe(201);
        expect(response.body.message).toBeFalsy();
    });
});
