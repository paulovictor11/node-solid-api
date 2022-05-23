import { User } from "../../../domain/user";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { FindUserByIdUseCase } from "./find-user-by-id-use-case";

const makeSut = () => {
    const makePrismaUserRepository = new PrismaUserRepository();
    const sut = new FindUserByIdUseCase(makePrismaUserRepository);

    return {
        makePrismaUserRepository,
        sut,
    };
};

const userSpy = {
    name: "Test Find",
    email: "test_find@email.com",
    password: "12345",
};

describe("Find user by id use case", () => {
    afterAll(async () => {
        const { makePrismaUserRepository } = makeSut();
        const user = await makePrismaUserRepository.findByEmail(userSpy.email);
        if (user) {
            await makePrismaUserRepository.delete(user.id);
        }
    });

    it("should throw an error when no user id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute("");

        expect(promise).rejects.toThrow(new NotFoundError("user"));
    });

    it("should return an user when a valid id is provided", async () => {
        const { sut, makePrismaUserRepository } = makeSut();
        await makePrismaUserRepository.create(new User(userSpy));

        const searchedUser = await makePrismaUserRepository.findByEmail(
            userSpy.email
        );
        const user = await sut.execute(searchedUser!.id);

        expect(user).toStrictEqual(searchedUser);
    });
});
