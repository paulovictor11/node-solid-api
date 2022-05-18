import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { ListAllProjectsUseCase } from "./list-all-projects-use-case";

const makePrismaProjectRespository = new PrismaProjectRepository();
const makeSut = new ListAllProjectsUseCase(makePrismaProjectRespository);

describe("List all projects use case", () => {
    it("should be able to return a list of projects", async () => {
        const promise = makeSut.execute();

        expect(promise).resolves.not.toThrow();
    });
});
