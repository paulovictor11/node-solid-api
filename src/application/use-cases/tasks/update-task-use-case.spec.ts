import { Task } from "../../../domain/task";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { MissingParamError } from "../../../utils/errors";
import { UpdateTaskUseCase } from "./update-task-use-case";

const makePrismaTaskRepository = new PrismaTaskRepository();
const makeSut = new UpdateTaskUseCase(makePrismaTaskRepository);

const taskSpy = {
    title: "Test Update",
    projectId: "d9138150-2ebd-4648-9032-c9b6ea39df72",
    assignedTo: "54b40821-4d38-4a1c-b0db-353a7071f14e",
    completed: false,
};

describe("Update task use case", () => {
    afterAll(async () => {
        const task = await makePrismaTaskRepository.findByTitle(taskSpy.title);
        if (task) {
            await makePrismaTaskRepository.delete(task.id);
        }
    });

    it("should throw an error when no task id is provided", async () => {
        const promise = makeSut.execute(taskSpy, "");

        expect(promise).rejects.toThrow(new MissingParamError("task id"));
    });

    it("should be able to update a task with correct data provided", async () => {
        await makePrismaTaskRepository.create(new Task(taskSpy));

        const task = await makePrismaTaskRepository.findByTitle(taskSpy.title);
        const promise = makeSut.execute(
            { ...taskSpy, completed: true },
            task!.id
        );

        expect(promise).resolves.not.toThrow();
    });
});
