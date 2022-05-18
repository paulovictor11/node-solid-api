import { Project } from "../../../domain/project";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { MissingParamError } from "../../../utils/errors";
import { FindProjectByIdUseCase } from "./find-project-by-id-use-case";

const makePrismaProjectRespository = new PrismaProjectRepository();
const makeSut = new FindProjectByIdUseCase(makePrismaProjectRespository);

const projectSpy = {
    title: "Test Find",
    description: "Lorem ipsum",
    userId: "fe248f27-5761-4435-aade-b8de2dccff76",
};

describe("Find project by id use case", () => {
    afterAll(async () => {
        const project = await makePrismaProjectRespository.findByTitle(
            projectSpy.title
        );

        if (project) {
            await makePrismaProjectRespository.delete(project.id);
        }
    });

    it("should throw an error if no project id is provided", async () => {
        const promise = makeSut.execute("");

        expect(promise).rejects.toThrow(new MissingParamError("project id"));
    });

    it("should return a project when a valid id is provided", async () => {
        await makePrismaProjectRespository.create(new Project(projectSpy));

        const searchedProject = await makePrismaProjectRespository.findByTitle(
            projectSpy.title
        );
        const project = await makeSut.execute(searchedProject!.id);

        expect(project.id).toStrictEqual(searchedProject!.id);
    });
});
