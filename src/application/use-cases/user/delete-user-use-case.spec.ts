import crypto from "crypto";
import { User } from "../../../domain/user";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { InMemoryUserRepository } from "../../../tests/repositories/InMemoryUserRepository";
import { MissingParamError } from "../../../utils/errors/missing-param-error";
import { DeleteUserUseCase } from "./delete-user-use-case";

const makeSut = () => {
    const repository = new InMemoryUserRepository();
    const sut = new DeleteUserUseCase(repository);

    return {
        repository,
        sut,
    };
};

const userSpy = {
    id: crypto.randomUUID(),
    name: "Test Delete",
    email: "test_delete@email.com",
    password: "12345",
};

describe("Delete user use case", () => {
    it("should thrown an error when no user id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute("");

        expect(promise).rejects.toThrow(new MissingParamError("user id"));
    });

    it("should thrown an error when an invalid user id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(userSpy.id);

        expect(promise).rejects.toThrow(new NotFoundError("user"));
    });

    it("should be able to delete an user", async () => {
        const { sut, repository } = makeSut();
        await repository.create(new User(userSpy, userSpy.id));

        const promise = sut.execute(userSpy.id);

        expect(promise).resolves.not.toThrow();
    });
});
