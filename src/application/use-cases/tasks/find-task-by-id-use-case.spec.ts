import crypto from "crypto";
import { Task } from "../../../domain/task";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { InMemoryTaskRepository } from "../../../tests/repositories/InMemoryTaskRepository";
import { MissingParamError } from "../../../utils/errors/missing-param-error";
import { FindTaskByIdUseCase } from "./find-task-by-id-use-case";

const makeSut = () => {
    const repository = new InMemoryTaskRepository();
    const sut = new FindTaskByIdUseCase(repository);

    return {
        repository,
        sut,
    };
};

const taskSpy = {
    id: crypto.randomUUID(),
    title: "Test Find",
    projectId: "0cba49a5-d610-4b78-bfa6-68cc20b2b557",
    assignedTo: "780b88dd-5aef-4e4a-9b5e-6facfabacd94",
    completed: false,
};

describe("Find task by id use case", () => {
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

    it("should return a task when a valid id is provided", async () => {
        const { sut, repository } = makeSut();
        const task = new Task(taskSpy, taskSpy.id);
        await repository.create(task);

        const result = await sut.execute(taskSpy.id);

        expect(task.projectId).toBeTruthy();
        expect(task.assignedTo).toBeTruthy();
        expect(task.completed).not.toBeNull();
        expect(result).toStrictEqual(task);
    });
});
