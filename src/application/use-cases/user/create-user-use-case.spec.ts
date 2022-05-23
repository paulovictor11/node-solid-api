import crypto from "crypto";
import { User } from "../../../domain/user";
import { InMemoryUserRepository } from "../../../tests/repositories/InMemoryUserRepository";
import { InvalidParamError, MissingParamError } from "../../../utils/errors";
import { EmailValidator } from "../../../utils/helpers/email-validator";
import { Encrypter } from "../../../utils/helpers/encrypter";
import { CreateUserUseCase } from "./create-user-use-case";

const makeSut = () => {
    const repository = new InMemoryUserRepository();
    const emailValidator = new EmailValidator();
    const encrypter = new Encrypter();
    const sut = new CreateUserUseCase(repository, emailValidator, encrypter);

    return {
        repository,
        emailValidator,
        encrypter,
        sut,
    };
};

const userSpy = {
    id: crypto.randomUUID(),
    name: "Test Create",
    email: "test_create@email.com",
    password: "12345",
};

describe("Create user use case", () => {
    it("should throw an error when no name is provided", async () => {
        const { sut } = makeSut();
        const user = { ...userSpy, name: "" };
        const promise = sut.execute(user);

        expect(promise).rejects.toThrow(new MissingParamError("name"));
    });

    it("should throw an error when no email is provided", async () => {
        const { sut } = makeSut();
        const user = { ...userSpy, email: "" };
        const promise = sut.execute(user);

        expect(promise).rejects.toThrow(new MissingParamError("email"));
    });

    it("should throw an error when an invalid email is provided", async () => {
        const { sut } = makeSut();
        const user = { ...userSpy, email: "teste" };
        const promise = sut.execute(user);

        expect(promise).rejects.toThrow(new InvalidParamError("email"));
    });

    it("should throw an error when no password is provided", async () => {
        const { sut } = makeSut();
        const user = { ...userSpy, password: "" };
        const promise = sut.execute(user);

        expect(promise).rejects.toThrow(new MissingParamError("password"));
    });

    it("should throw an error when an existing user is provided", async () => {
        const { sut, repository } = makeSut();
        const user = {
            name: "Test2",
            email: "test2_create@email.com",
            password: "12345",
        };
        await repository.create(new User(user));

        const promise = sut.execute(user);

        expect(promise).rejects.toThrow("User already exists");
    });

    it("should be able to create an user", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(userSpy);

        expect(promise).resolves.not.toThrow();
        expect(await promise).toBeUndefined();
    });
});
