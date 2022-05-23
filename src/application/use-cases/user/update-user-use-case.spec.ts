import crypto from "crypto";
import { User } from "../../../domain/user";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { InMemoryUserRepository } from "../../../tests/repositories/InMemoryUserRepository";
import { MissingParamError } from "../../../utils/errors";
import { UpdateUserUseCase } from "./update-user-use-case";

const makeSut = () => {
    const repository = new InMemoryUserRepository();
    const sut = new UpdateUserUseCase(repository);

    return {
        repository,
        sut,
    };
};

const userSpy = {
    id: crypto.randomUUID(),
    name: "Test Update",
    email: "test_update@email.com",
    password: "12345",
};

describe("Update user use case", () => {
    it("should thrown an error when no user id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(userSpy, "");

        expect(promise).rejects.toThrow(new MissingParamError("user id"));
    });

    it("should throw an error when an invalid user id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(userSpy, userSpy.id);

        expect(promise).rejects.toThrow(new NotFoundError("user"));
    });

    it("should be able to update a user with correct data provided", async () => {
        const { sut, repository } = makeSut();
        await repository.create(new User(userSpy, userSpy.id));

        const promise = sut.execute(
            { ...userSpy, password: "123456" },
            userSpy.id
        );

        expect(promise).resolves.not.toThrow();
    });
});
