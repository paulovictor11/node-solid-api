import { Task } from "../../../domain/task";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { MissingParamError } from "../../../utils/errors";
import { UpdateTaskUseCase } from "./update-task-use-case";

const makeSut = () => {
    const makePrismaTaskRepository = new PrismaTaskRepository();
    const sut = new UpdateTaskUseCase(makePrismaTaskRepository);

    return {
        makePrismaTaskRepository,
        sut,
    };
};

const taskSpy = {
    title: "Test Update",
    projectId: "0cba49a5-d610-4b78-bfa6-68cc20b2b557",
    assignedTo: "780b88dd-5aef-4e4a-9b5e-6facfabacd94",
    completed: false,
};

describe("Update task use case", () => {
    afterAll(async () => {
        const { makePrismaTaskRepository } = makeSut();
        const task = await makePrismaTaskRepository.findByTitle(taskSpy.title);
        if (task) {
            await makePrismaTaskRepository.delete(task.id);
        }
    });

    it("should throw an error when no task id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(taskSpy, "");

        expect(promise).rejects.toThrow(new MissingParamError("task id"));
    });

    it("should be able to update a task with correct data provided", async () => {
        const { sut, makePrismaTaskRepository } = makeSut();
        await makePrismaTaskRepository.create(new Task(taskSpy));

        const task = await makePrismaTaskRepository.findByTitle(taskSpy.title);
        const promise = sut.execute({ ...taskSpy, completed: true }, task!.id);

        expect(promise).resolves.not.toThrow();
    });
});
