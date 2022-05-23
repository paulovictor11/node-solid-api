import { User } from "../../../domain/user";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { UpdateUserUseCase } from "./update-user-use-case";

const makeSut = () => {
    const makePrismaUserRepository = new PrismaUserRepository();
    const sut = new UpdateUserUseCase(makePrismaUserRepository);

    return {
        makePrismaUserRepository,
        sut,
    };
};

const userSpy = {
    name: "Test Update",
    email: "test_update@email.com",
    password: "12345",
};

describe("Update user use case", () => {
    afterAll(async () => {
        const { makePrismaUserRepository } = makeSut();
        const user = await makePrismaUserRepository.findByEmail(userSpy.email);
        if (user) {
            await makePrismaUserRepository.delete(user.id);
        }
    });

    it("should throw an error when an invalid user id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(userSpy, "");

        expect(promise).rejects.toThrow(new NotFoundError("user"));
    });

    it("should be able to update a user with correct data provided", async () => {
        const { sut, makePrismaUserRepository } = makeSut();
        await makePrismaUserRepository.create(new User(userSpy));

        const user = await makePrismaUserRepository.findByEmail(userSpy.email);
        const promise = sut.execute(
            { ...userSpy, password: "123456" },
            user!.id
        );

        expect(promise).resolves.not.toThrow();
    });
});
