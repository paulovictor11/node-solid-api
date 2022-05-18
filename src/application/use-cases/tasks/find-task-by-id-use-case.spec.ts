import { Task } from "../../../domain/task";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { MissingParamError } from "../../../utils/errors";
import { FindTaskByIdUseCase } from "./find-task-by-id-use-case";

const makePrismaTaskRepository = new PrismaTaskRepository();
const makeSut = new FindTaskByIdUseCase(makePrismaTaskRepository);

const taskSpy = {
    title: "Test Find",
    projectId: "d9138150-2ebd-4648-9032-c9b6ea39df72",
    assignedTo: "54b40821-4d38-4a1c-b0db-353a7071f14e",
    completed: false,
};

describe("Find task by id use case", () => {
    afterAll(async () => {
        const task = await makePrismaTaskRepository.findByTitle(taskSpy.title);
        if (task) {
            await makePrismaTaskRepository.delete(task.id);
        }
    });

    it("should throw an error when no task id is provided", async () => {
        const promise = makeSut.execute("");

        expect(promise).rejects.toThrow(new MissingParamError("task id"));
    });

    it("should return a task when a valid id is provided", async () => {
        await makePrismaTaskRepository.create(new Task(taskSpy));

        const searchedTask = await makePrismaTaskRepository.findByTitle(
            taskSpy.title
        );
        const task = await makeSut.execute(searchedTask!.id);

        expect(task).toStrictEqual(searchedTask);
    });
});
