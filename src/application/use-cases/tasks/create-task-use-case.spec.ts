import crypto from "crypto";
import { InMemoryTaskRepository } from "../../../tests/repositories/InMemoryTaskRepository";
import { MissingParamError } from "../../../utils/errors";
import { CreateTaskUseCase } from "./create-task-use-case";

const makeSut = () => {
    const repository = new InMemoryTaskRepository();
    const sut = new CreateTaskUseCase(repository);

    return {
        repository,
        sut,
    };
};

const taskSpy = {
    id: crypto.randomUUID(),
    title: "Test Create",
    projectId: "0cba49a5-d610-4b78-bfa6-68cc20b2b557",
    assignedTo: "780b88dd-5aef-4e4a-9b5e-6facfabacd94",
    completed: false,
};

describe("Create task use case", () => {
    it("should throw an error when no title is provided", () => {
        const { sut } = makeSut();
        const task = { ...taskSpy, title: "" };
        const promise = sut.execute(task);

        expect(promise).rejects.toThrow(new MissingParamError("title"));
    });

    it("should throw an error when no project id is provided", () => {
        const { sut } = makeSut();
        const task = { ...taskSpy, projectId: "" };
        const promise = sut.execute(task);

        expect(promise).rejects.toThrow(new MissingParamError("project id"));
    });

    it("should throw an error when no user responsable is provided", () => {
        const { sut } = makeSut();
        const task = { ...taskSpy, assignedTo: "" };
        const promise = sut.execute(task);

        expect(promise).rejects.toThrow(new MissingParamError("user"));
    });

    it("should be able to create a task", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(taskSpy);

        expect(promise).resolves.not.toThrow();
    });
});
