import { Project } from "../../../domain/project";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { DeleteProjectUseCase } from "./delete-project-use-case";

const makePrismaProjectRespository = new PrismaProjectRepository();
const makeSut = new DeleteProjectUseCase(makePrismaProjectRespository);

const projectSpy = {
    title: "Test Delete",
    description: "Lorem ipsum",
    userId: "fe248f27-5761-4435-aade-b8de2dccff76",
};

describe("Delete project use case", () => {
    it("should throw an error when no project id is provided", async () => {
        const promise = makeSut.execute("");

        expect(promise).rejects.toThrow(new NotFoundError("project"));
    });

    it("should be able to delete a project", async () => {
        await makePrismaProjectRespository.create(new Project(projectSpy));

        const project = await makePrismaProjectRespository.findByTitle(
            projectSpy.title
        );
        const promise = makeSut.execute(project!.id);

        expect(promise).resolves.not.toThrow();
    });
});
