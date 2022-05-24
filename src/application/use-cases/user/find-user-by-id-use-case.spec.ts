import crypto from "crypto";
import { User } from "../../../domain/user";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { InMemoryUserRepository } from "../../../tests/repositories/InMemoryUserRepository";
import { MissingParamError } from "../../../utils/errors/missing-param-error";
import { FindUserByIdUseCase } from "./find-user-by-id-use-case";

const makeSut = () => {
    const repository = new InMemoryUserRepository();
    const sut = new FindUserByIdUseCase(repository);

    return {
        repository,
        sut,
    };
};

const userSpy = {
    id: crypto.randomUUID(),
    name: "Test Find",
    email: "test_find@email.com",
    password: "12345",
};

describe("Find user by id use case", () => {
    it("should thrown an error when no user id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute("");

        expect(promise).rejects.toThrow(new MissingParamError("user id"));
    });

    it("should throw an error when an invalid user id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(userSpy.id);

        expect(promise).rejects.toThrow(new NotFoundError("user"));
    });

    it("should return an user when a valid id is provided", async () => {
        const { sut, repository } = makeSut();
        await repository.create(new User(userSpy, userSpy.id));

        const user = await sut.execute(userSpy.id);

        expect(user).toStrictEqual(new User(userSpy, userSpy.id));
    });
});
