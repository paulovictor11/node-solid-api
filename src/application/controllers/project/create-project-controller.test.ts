import request from "supertest";
import { app } from "../../../app";

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
