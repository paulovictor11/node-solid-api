import { InMemoryTaskRepository } from "../../../tests/repositories/InMemoryTaskRepository";
import { ListAllTasksUseCase } from "./list-all-tasks-use-case";

const makeSut = () => {
    const repository = new InMemoryTaskRepository();
    const sut = new ListAllTasksUseCase(repository);

    return {
        repository,
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
