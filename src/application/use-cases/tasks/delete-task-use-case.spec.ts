import { Task } from "../../../domain/task";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { MissingParamError } from "../../../utils/errors";
import { DeleteTaskUseCase } from "./delete-task-use-case";

const makePrismaTaskRepository = new PrismaTaskRepository();
const makeSut = new DeleteTaskUseCase(makePrismaTaskRepository);

const taskSpy = {
    title: "Test Delete",
    projectId: "d9138150-2ebd-4648-9032-c9b6ea39df72",
    assignedTo: "54b40821-4d38-4a1c-b0db-353a7071f14e",
    completed: false,
};

describe("Delete task use case", () => {
    it("should throw an error when no task id is provided", async () => {
        const promise = makeSut.execute("");

        expect(promise).rejects.toThrow(new MissingParamError("task id"));
    });

    it("should be able to delete a task", async () => {
        await makePrismaTaskRepository.create(new Task(taskSpy));

        const task = await makePrismaTaskRepository.findByTitle(taskSpy.title);
        const promise = makeSut.execute(task!.id);

        expect(promise).resolves.not.toThrow();
    });
});
