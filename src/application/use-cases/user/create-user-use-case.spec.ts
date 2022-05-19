import { User } from "../../../domain/user";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { InvalidParamError, MissingParamError } from "../../../utils/errors";
import { EmailValidator } from "../../../utils/helpers/email-validator";
import { Encrypter } from "../../../utils/helpers/encrypter";
import { CreateUserUseCase } from "./create-user-use-case";

const makePrismaUserRepository = new PrismaUserRepository();
const emailValidator = new EmailValidator();
const encrypter = new Encrypter();
const makeSut = new CreateUserUseCase(
    makePrismaUserRepository,
    emailValidator,
    encrypter
);

const userSpy = {
    name: "Test Create",
    email: "test_create@email.com",
    password: "12345",
};

describe("Create user use case", () => {
    afterAll(async () => {
        const user2 = await makePrismaUserRepository.findByEmail(
            "test2_create@email.com"
        );
        if (user2) {
            await makePrismaUserRepository.delete(user2.id);
        }

        const user1 = await makePrismaUserRepository.findByEmail(
            "test_create@email.com"
        );
        if (user1) {
            await makePrismaUserRepository.delete(user1.id);
        }
    });

    it("should throw an error when no name is provided", async () => {
        const user = { ...userSpy, name: "" };
        const promise = makeSut.execute(user);

        expect(promise).rejects.toThrow(new MissingParamError("name"));
    });

    it("should throw an error when no email is provided", async () => {
        const user = { ...userSpy, email: "" };
        const promise = makeSut.execute(user);

        expect(promise).rejects.toThrow(new MissingParamError("email"));
    });

    it("should throw an error when an invalid email is provided", async () => {
        const user = { ...userSpy, email: "teste" };
        const promise = makeSut.execute(user);

        expect(promise).rejects.toThrow(new InvalidParamError("email"));
    });

    it("should throw an error when no password is provided", async () => {
        const user = { ...userSpy, password: "" };
        const promise = makeSut.execute(user);

        expect(promise).rejects.toThrow(new MissingParamError("password"));
    });

    it("should throw an error when an existing user is provided", async () => {
        const user = {
            name: "Test2",
            email: "test2_create@email.com",
            password: "12345",
        };
        await makePrismaUserRepository.create(new User(user));
        const promise = makeSut.execute(user);

        expect(promise).rejects.toThrow("User already exists");
    });

    it("should be able to create an user", async () => {
        const promise = makeSut.execute(userSpy);

        expect(promise).resolves.not.toThrow();
    });
});
