import crypto from "crypto";
import { Project } from "../../../domain/project";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { InMemoryProjectRepository } from "../../../tests/repositories/InMemoryProjectRepository";
import { MissingParamError } from "../../../utils/errors";
import { UpdateProjectUseCase } from "./update-project-use-case";

const makeSut = () => {
    const repository = new InMemoryProjectRepository();
    const sut = new UpdateProjectUseCase(repository);

    return {
        repository,
        sut,
    };
};

const projectSpy = {
    id: crypto.randomUUID(),
    title: "Test Update",
    description: "Lorem ipsum",
    userId: "780b88dd-5aef-4e4a-9b5e-6facfabacd94",
};

describe("Update project use case", () => {
    it("should thrown an error when no project id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(projectSpy, "");

        expect(promise).rejects.toThrow(new MissingParamError("project id"));
    });

    it("should throw an error if an invalid project id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(projectSpy, projectSpy.id);

        expect(promise).rejects.toThrow(new NotFoundError("project"));
    });

    it("should be able to update a project with correct data provided", async () => {
        const { sut, repository } = makeSut();
        await repository.create(new Project(projectSpy, projectSpy.id));

        const promise = sut.execute(
            { ...projectSpy, description: "My Lorem Ipsum" },
            projectSpy.id
        );

        expect(promise).resolves.not.toThrow();
    });
});
