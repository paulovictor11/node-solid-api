import request from "supertest";
import { app } from "../../../app";
import { Project } from "../../../domain/project";

const projectSpy = async () => {
    await request(app).post("/users").send({
        name: "Test",
        email: "test@email.com",
        password: "12345",
    });
    const { body } = await request(app).get("/users").send();

    return {
        title: "Test",
        description: "Lorem ipsum",
        userId: body[0]._id,
    };
};

const project = async () => {
    const model = await projectSpy();
    await request(app).post("/projects").send(model);
    const { body } = await request(app).get("/projects").send();

    return new Project(body[0].props, body[0]._id);
};

describe("[e2e] Update project controller", () => {
    it("should return status 400 when return an error", async () => {
        const response = await request(app).put("/project/1").send();

        expect(response.status).toBe(400);
        expect(response.body.message).toBeTruthy();
    });

    it("should return status 200 when valid data is provided", async () => {
        const model = await projectSpy();
        const { id } = await project();

        const response = await request(app)
            .put(`/project/${id}`)
            .send({
                ...model,
                title: "Test 2",
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBeFalsy();
    });
});
