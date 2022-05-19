import { Task } from "../../../domain/task";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { MissingParamError } from "../../../utils/errors";
import { DeleteTaskUseCase } from "./delete-task-use-case";

const makePrismaTaskRepository = new PrismaTaskRepository();
const makeSut = new DeleteTaskUseCase(makePrismaTaskRepository);

const taskSpy = {
    title: "Test Delete",
    projectId: "0cba49a5-d610-4b78-bfa6-68cc20b2b557",
    assignedTo: "780b88dd-5aef-4e4a-9b5e-6facfabacd94",
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
