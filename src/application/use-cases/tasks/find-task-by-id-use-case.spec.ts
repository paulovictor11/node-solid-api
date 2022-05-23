import { Task } from "../../../domain/task";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { MissingParamError } from "../../../utils/errors";
import { FindTaskByIdUseCase } from "./find-task-by-id-use-case";

const makeSut = () => {
    const makePrismaTaskRepository = new PrismaTaskRepository();
    const sut = new FindTaskByIdUseCase(makePrismaTaskRepository);

    return {
        makePrismaTaskRepository,
        sut,
    };
};

const taskSpy = {
    title: "Test Find",
    projectId: "0cba49a5-d610-4b78-bfa6-68cc20b2b557",
    assignedTo: "780b88dd-5aef-4e4a-9b5e-6facfabacd94",
    completed: false,
};

describe("Find task by id use case", () => {
    afterAll(async () => {
        const { makePrismaTaskRepository } = makeSut();
        const task = await makePrismaTaskRepository.findByTitle(taskSpy.title);
        if (task) {
            await makePrismaTaskRepository.delete(task.id);
        }
    });

    it("should throw an error when no task id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute("");

        expect(promise).rejects.toThrow(new MissingParamError("task id"));
    });

    it("should return a task when a valid id is provided", async () => {
        const { sut, makePrismaTaskRepository } = makeSut();
        await makePrismaTaskRepository.create(new Task(taskSpy));

        const searchedTask = await makePrismaTaskRepository.findByTitle(
            taskSpy.title
        );
        const task = await sut.execute(searchedTask!.id);

        expect(task).toStrictEqual(searchedTask);
    });
});
