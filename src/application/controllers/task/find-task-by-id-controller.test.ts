import request from "supertest";
import { app } from "../../../app";
import { Project } from "../../../domain/project";
import { Task } from "../../../domain/task";
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

const task = async () => {
    const model = await taskSpy();
    await request(app).post("/tasks").send(model);
    const { body } = await request(app).get("/tasks").send();

    return new Task(body[0].props, body[0]._id);
};

describe("[e2e] Find task by id controller", () => {
    it("should return status 400 when return an error", async () => {
        const response = await request(app).get("/task/1").send();

        expect(response.status).toBe(400);
        expect(response.body.message).toBeTruthy();
    });

    it("should return status 200 when valid data is provided", async () => {
        const { id } = await task();
        const response = await request(app).get(`/task/${id}`).send();

        expect(response.status).toBe(200);
        expect(response.body.message).toBeFalsy();
    });
});
