import { Project } from "../../../domain/project";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { UpdateProjectUseCase } from "./update-project-use-case";

const makePrismaProjectRespository = new PrismaProjectRepository();
const makeSut = new UpdateProjectUseCase(makePrismaProjectRespository);

const projectSpy = {
    title: "Test Update",
    description: "Lorem ipsum",
    userId: "780b88dd-5aef-4e4a-9b5e-6facfabacd94",
};

describe("Update project use case", () => {
    afterAll(async () => {
        const project = await makePrismaProjectRespository.findByTitle(
            projectSpy.title
        );

        if (project) {
            await makePrismaProjectRespository.delete(project.id);
        }
    });

    it("should throw an error if no project id is provided", async () => {
        const promise = makeSut.execute(projectSpy, "");

        expect(promise).rejects.toThrow(new NotFoundError("project"));
    });

    it("should be able to update a project with correct data provided", async () => {
        await makePrismaProjectRespository.create(new Project(projectSpy));

        const project = await makePrismaProjectRespository.findByTitle(
            projectSpy.title
        );
        const promise = makeSut.execute(
            { ...projectSpy, description: "My Lorem Ipsum" },
            project!.id
        );

        expect(promise).resolves.not.toThrow();
    });
});
