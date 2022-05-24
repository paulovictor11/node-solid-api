import request from "supertest";
import { app } from "../../../app";
import { Project } from "../../../domain/project";
import { Task } from "../../../domain/task";

const projectSpy = async () => {
    await request(app).post("/users").send({
        name: "Test",
        email: "test@email.com",
        password: "12345",
    });
    const { body: userBody } = await request(app).get("/users").send();

    await request(app).post("/projects").send({
        title: "Test",
        description: "Lorem ipsum",
        userId: userBody[0]._id,
    });
    const { body } = await request(app).get("/projects").send();

    return new Project(body[0].props, body[0]._id);
};

const taskSpy = async () => {
    const { id, userId } = await projectSpy();
    return {
        title: "Test",
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

describe("[e2e] Find task by title controller", () => {
    it("should return status 400 when return an error", async () => {
        const { title } = await taskSpy();
        const response = await request(app).post("/task/title").send({
            title,
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBeTruthy();
    });

    it("should return status 200 when valid data is provided", async () => {
        const { title } = await task();
        const response = await request(app).post("/task/title").send({
            title,
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBeFalsy();
    });
});
