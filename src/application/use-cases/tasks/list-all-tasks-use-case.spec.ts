import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { ListAllTasksUseCase } from "./list-all-tasks-use-case";

const makeSut = () => {
    const makePrismaTaskRepository = new PrismaTaskRepository();
    const sut = new ListAllTasksUseCase(makePrismaTaskRepository);

    return {
        makePrismaTaskRepository,
        sut,
    };
};

describe("List all tasks use case", () => {
    it("should return a list of tasks", async () => {
        const { sut } = makeSut();
        const promise = sut.execute();

        expect(promise).resolves.not.toThrow();
    });
});
