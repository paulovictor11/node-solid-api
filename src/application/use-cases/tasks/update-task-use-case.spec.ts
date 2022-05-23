import crypto from "crypto";
import { Task } from "../../../domain/task";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { InMemoryTaskRepository } from "../../../tests/repositories/InMemoryTaskRepository";
import { MissingParamError } from "../../../utils/errors";
import { UpdateTaskUseCase } from "./update-task-use-case";

const makeSut = () => {
    const repository = new InMemoryTaskRepository();
    const sut = new UpdateTaskUseCase(repository);

    return {
        repository,
        sut,
    };
};

const taskSpy = {
    id: crypto.randomUUID(),
    title: "Test Update",
    projectId: "0cba49a5-d610-4b78-bfa6-68cc20b2b557",
    assignedTo: "780b88dd-5aef-4e4a-9b5e-6facfabacd94",
    completed: false,
};

describe("Update task use case", () => {
    it("should throw an error when no task id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(taskSpy, "");

        expect(promise).rejects.toThrow(new MissingParamError("task id"));
    });

    it("should throw an error when an invalid task id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(taskSpy, taskSpy.id);

        expect(promise).rejects.toThrow(new NotFoundError("task"));
    });

    it("should be able to update a task with correct data provided", async () => {
        const { sut, repository } = makeSut();
        await repository.create(new Task(taskSpy, taskSpy.id));

        const promise = sut.execute(
            { ...taskSpy, completed: true },
            taskSpy.id
        );

        expect(promise).resolves.not.toThrow();
    });
});
