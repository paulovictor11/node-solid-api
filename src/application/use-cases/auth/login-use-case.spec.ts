import crypto from "crypto";
import { User } from "../../../domain/user";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { InMemoryUserRepository } from "../../../tests/repositories/InMemoryUserRepository";
import { MissingParamError } from "../../../utils/errors/missing-param-error";
import { Encrypter } from "../../../utils/helpers/encrypter";
import { TokenGenerator } from "../../../utils/helpers/token-generator";
import { LoginUseCase } from "./login-use-case";

const makeSut = () => {
    const repository = new InMemoryUserRepository();
    const encrypter = new Encrypter();
    const tokenGenerator = new TokenGenerator();
    const sut = new LoginUseCase(repository, encrypter, tokenGenerator);

    return {
        repository,
        encrypter,
        tokenGenerator,
        sut,
    };
};

const userSpy = {
    id: crypto.randomUUID(),
    name: "Test",
    email: "test@email.com",
    password: "12345",
};

describe("Login use case", () => {
    it("should throw an error when no email is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({ email: "", password: userSpy.password });

        expect(promise).rejects.toThrow(new MissingParamError("email"));
    });

    it("should throw an error when no password is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({ email: userSpy.email, password: "" });

        expect(promise).rejects.toThrow(new MissingParamError("password"));
    });

    it("should throw an error when no user is founded", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({
            email: userSpy.email,
            password: userSpy.password,
        });

        expect(promise).rejects.toThrow(new NotFoundError("user"));
    });

    it("should throw an error when an invalid password is provided", async () => {
        const { sut, repository } = makeSut();
        await repository.create(new User(userSpy, userSpy.id));

        const promise = sut.execute({
            email: userSpy.email,
            password: "123456",
        });

        expect(promise).rejects.toThrow("Invalid password");
    });

    it("should be able to authentica a user", async () => {
        const { sut, repository, encrypter } = makeSut();
        const hashedPassword = await encrypter.encrypt(userSpy.password);
        await repository.create(
            new User({ ...userSpy, password: hashedPassword }, userSpy.id)
        );

        const result = await sut.execute({
            email: userSpy.email,
            password: userSpy.password,
        });

        expect(result.user).toBeTruthy();
        expect(result.token).toBeTruthy();
    });
});
