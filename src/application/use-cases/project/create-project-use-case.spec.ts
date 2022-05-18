import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { MissingParamError } from "../../../utils/errors";
import { CreateProjectUseCase } from "./create-project-use-case";

const makePrismaProjectRespository = new PrismaProjectRepository();
const makeSut = new CreateProjectUseCase(makePrismaProjectRespository);

const projectSpy = {
    title: "Test Create",
    description: "Lorem ipsum",
    userId: "fe248f27-5761-4435-aade-b8de2dccff76",
};

describe("Create project use case", () => {
    afterAll(async () => {
        const project = await makePrismaProjectRespository.findByTitle(
            projectSpy.title
        );

        if (project) {
            await makePrismaProjectRespository.delete(project.id);
        }
    });

    it("should throw an error when no title is provided", async () => {
        const project = { ...projectSpy, title: "" };
        const promise = makeSut.execute(project);

        expect(promise).rejects.toThrow(new MissingParamError("title"));
    });

    it("should throw an error when no description is provided", async () => {
        const project = { ...projectSpy, description: "" };
        const promise = makeSut.execute(project);

        expect(promise).rejects.toThrow(new MissingParamError("description"));
    });

    it("should throw an error when no user id is provided", async () => {
        const project = { ...projectSpy, userId: "" };
        const promise = makeSut.execute(project);

        expect(promise).rejects.toThrow(new MissingParamError("user id"));
    });

    it("should be able to create a project", async () => {
        const promise = makeSut.execute(projectSpy);

        expect(promise).resolves.not.toThrow();
    });
});
