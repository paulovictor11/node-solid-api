import { User } from "../../../domain/user";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { DeleteUserUseCase } from "./delete-user-use-case";

const makePrismaUserRepository = new PrismaUserRepository();
const makeSut = new DeleteUserUseCase(makePrismaUserRepository);

const userSpy = {
    name: "Test Delete",
    email: "test_delete@email.com",
    password: "12345",
};

describe("Delete user use case", () => {
    it("should thrown an error when no user id is provided", async () => {
        const promise = makeSut.execute("");

        expect(promise).rejects.toThrow(new NotFoundError("user"));
    });

    it("should be able to delete an user", async () => {
        await makePrismaUserRepository.create(new User(userSpy));

        const user = await makePrismaUserRepository.findByEmail(userSpy.email);
        const promise = makeSut.execute(user!.id);

        expect(promise).resolves.not.toThrow();
    });
});
