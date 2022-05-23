import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { ListAllProjectsUseCase } from "./list-all-projects-use-case";

const makeSut = () => {
    const makePrismaProjectRespository = new PrismaProjectRepository();
    const sut = new ListAllProjectsUseCase(makePrismaProjectRespository);

    return {
        makePrismaProjectRespository,
        sut,
    };
};

describe("List all projects use case", () => {
    it("should be able to return a list of projects", async () => {
        const { sut } = makeSut();
        const promise = sut.execute();

        expect(promise).resolves.not.toThrow();
    });
});
