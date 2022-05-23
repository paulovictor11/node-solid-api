import { User } from "../../../domain/user";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { DeleteUserUseCase } from "./delete-user-use-case";

const makeSut = () => {
    const makePrismaUserRepository = new PrismaUserRepository();
    const sut = new DeleteUserUseCase(makePrismaUserRepository);

    return {
        makePrismaUserRepository,
        sut,
    };
};

const userSpy = {
    name: "Test Delete",
    email: "test_delete@email.com",
    password: "12345",
};

describe("Delete user use case", () => {
    it("should thrown an error when no user id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute("");

        expect(promise).rejects.toThrow(new NotFoundError("user"));
    });

    it("should be able to delete an user", async () => {
        const { sut, makePrismaUserRepository } = makeSut();
        await makePrismaUserRepository.create(new User(userSpy));

        const user = await makePrismaUserRepository.findByEmail(userSpy.email);
        const promise = sut.execute(user!.id);

        expect(promise).resolves.not.toThrow();
    });
});
