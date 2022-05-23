import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { ListAllUsersUseCase } from "./list-all-users-use-case";

const makeSut = () => {
    const makePrismaUserRepository = new PrismaUserRepository();
    const sut = new ListAllUsersUseCase(makePrismaUserRepository);

    return {
        makePrismaUserRepository,
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
