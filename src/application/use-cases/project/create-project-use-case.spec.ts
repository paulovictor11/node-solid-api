import crypto from "crypto";
import { InMemoryProjectRepository } from "../../../tests/repositories/InMemoryProjectRepository";
import { MissingParamError } from "../../../utils/errors";
import { CreateProjectUseCase } from "./create-project-use-case";

const makeSut = () => {
    const repository = new InMemoryProjectRepository();
    const sut = new CreateProjectUseCase(repository);

    return {
        repository,
        sut,
    };
};

const projectSpy = {
    id: crypto.randomUUID(),
    title: "Test Create",
    description: "Lorem ipsum",
    userId: "780b88dd-5aef-4e4a-9b5e-6facfabacd94",
};

describe("Create project use case", () => {
    it("should throw an error when no title is provided", async () => {
        const { sut } = makeSut();
        const project = { ...projectSpy, title: "" };
        const promise = sut.execute(project);

        expect(promise).rejects.toThrow(new MissingParamError("title"));
    });

    it("should throw an error when no description is provided", async () => {
        const { sut } = makeSut();
        const project = { ...projectSpy, description: "" };
        const promise = sut.execute(project);

        expect(promise).rejects.toThrow(new MissingParamError("description"));
    });

    it("should throw an error when no user id is provided", async () => {
        const { sut } = makeSut();
        const project = { ...projectSpy, userId: "" };
        const promise = sut.execute(project);

        expect(promise).rejects.toThrow(new MissingParamError("user id"));
    });

    it("should be able to create a project", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(projectSpy);

        expect(promise).resolves.not.toThrow();
    });
});
