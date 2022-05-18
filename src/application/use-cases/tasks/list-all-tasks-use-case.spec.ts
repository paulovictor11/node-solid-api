import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { ListAllTasksUseCase } from "./list-all-tasks-use-case";

const makePrismaTaskRepository = new PrismaTaskRepository();
const makeSut = new ListAllTasksUseCase(makePrismaTaskRepository);

describe("List all tasks use case", () => {
    it("should return a list of tasks", async () => {
        const promise = makeSut.execute();

        expect(promise).resolves.not.toThrow();
    });
});
