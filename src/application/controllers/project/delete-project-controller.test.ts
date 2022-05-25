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
    const { body } = await request(app).get("/users").send();

    return {
        title: faker.random.alpha(),
        description: faker.lorem.sentence(),
        userId: body[0]._id,
    };
};

const project = async () => {
    const model = await projectSpy();
    await request(app).post("/projects").send(model);
    const { body } = await request(app).post("/project/title").send({
        title: model.title,
    });

    return new Project(body.props, body._id);
};

describe("[e2e] Delete project controller", () => {
    it("should return status 400 when return an error", async () => {
        const response = await request(app).post("/projects").send();

        expect(response.status).toBe(400);
        expect(response.body.message).toBeTruthy();
    });

    it("should return status 200 when valid data is provided", async () => {
        const { id } = await project();
        const response = await request(app).delete(`/project/${id}`).send();

        expect(response.status).toBe(200);
        expect(response.body.message).toBeFalsy();
    });
});
