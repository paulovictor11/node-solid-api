import { InMemoryUserRepository } from "../../../tests/repositories/InMemoryUserRepository";
import { ListAllUsersUseCase } from "./list-all-users-use-case";

const makeSut = () => {
    const repository = new InMemoryUserRepository();
    const sut = new ListAllUsersUseCase(repository);

    return {
        repository,
        sut,
    };
};

describe("List all users use case", () => {
    it("should be able to return a list of users", async () => {
        const { sut } = makeSut();
        const promise = sut.execute();

        expect(promise).resolves.not.toThrow();
    });
});
