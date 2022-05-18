import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { ListAllUsersUseCase } from "./list-all-users-use-case";

const makePrismaUserRepository = new PrismaUserRepository();
const makeSut = new ListAllUsersUseCase(makePrismaUserRepository);

describe("List all users use case", () => {
    it("should be able to return a list of users", async () => {
        const promise = makeSut.execute();

        expect(promise).resolves.not.toThrow();
    });
});
