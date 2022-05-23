import crypto from "crypto";
import { Task } from "../../../domain/task";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { InMemoryTaskRepository } from "../../../tests/repositories/InMemoryTaskRepository";
import { MissingParamError } from "../../../utils/errors";
import { DeleteTaskUseCase } from "./delete-task-use-case";

const makeSut = () => {
    const repository = new InMemoryTaskRepository();
    const sut = new DeleteTaskUseCase(repository);

    return {
        repository,
        sut,
    };
};

const taskSpy = {
    id: crypto.randomUUID(),
    title: "Test Delete",
    projectId: "0cba49a5-d610-4b78-bfa6-68cc20b2b557",
    assignedTo: "780b88dd-5aef-4e4a-9b5e-6facfabacd94",
    completed: false,
};

describe("Delete task use case", () => {
    it("should throw an error when no task id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute("");

        expect(promise).rejects.toThrow(new MissingParamError("task id"));
    });

    it("should throw an error when an invalid task id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(taskSpy.id);

        expect(promise).rejects.toThrow(new NotFoundError("task"));
    });

    it("should be able to delete a task", async () => {
        const { sut, repository } = makeSut();
        await repository.create(new Task(taskSpy, taskSpy.id));

        const promise = sut.execute(taskSpy.id);

        expect(promise).resolves.not.toThrow();
    });
});
