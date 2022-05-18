import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { MissingParamError } from "../../../utils/errors";
import { CreateTaskUseCase } from "./create-task-use-case";

const makePrismaTaskRepository = new PrismaTaskRepository();
const makeSut = new CreateTaskUseCase(makePrismaTaskRepository);

const taskSpy = {
    title: "Test Create",
    projectId: "d9138150-2ebd-4648-9032-c9b6ea39df72",
    assignedTo: "54b40821-4d38-4a1c-b0db-353a7071f14e",
    completed: false,
};

describe("Create task use case", () => {
    afterAll(async () => {
        const task = await makePrismaTaskRepository.findByTitle(taskSpy.title);
        if (task) {
            await makePrismaTaskRepository.delete(task.id);
        }
    });

    it("should throw an error when no title is provided", () => {
        const task = { ...taskSpy, title: "" };
        const promise = makeSut.execute(task);

        expect(promise).rejects.toThrow(new MissingParamError("title"));
    });

    it("should throw an error when no project id is provided", () => {
        const task = { ...taskSpy, projectId: "" };
        const promise = makeSut.execute(task);

        expect(promise).rejects.toThrow(new MissingParamError("project id"));
    });

    it("should throw an error when no user responsable is provided", () => {
        const task = { ...taskSpy, assignedTo: "" };
        const promise = makeSut.execute(task);

        expect(promise).rejects.toThrow(new MissingParamError("user"));
    });

    it("should be able to create a task", async () => {
        const promise = makeSut.execute(taskSpy);

        expect(promise).resolves.not.toThrow();
    });
});
