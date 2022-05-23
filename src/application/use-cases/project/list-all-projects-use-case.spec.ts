import { InMemoryProjectRepository } from "../../../tests/repositories/InMemoryProjectRepository";
import { ListAllProjectsUseCase } from "./list-all-projects-use-case";

const makeSut = () => {
    const repository = new InMemoryProjectRepository();
    const sut = new ListAllProjectsUseCase(repository);

    return {
        repository,
        sut,
    };
};

describe("List all projects use case", () => {
    it("should be able to return a list of projects", async () => {
        const { sut } = makeSut();
        const promise = sut.execute();

        expect(promise).resolves.not.toThrow();
    });
});
