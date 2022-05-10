import { Request, Response } from "express";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { IControllerRepository } from "../../repositories/controller-repository";
import { ListAllProjectsUseCase } from "../../use-cases/project/list-all-projects-use-case";

export class ListAllProjectsController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const prismaProjectRepository = new PrismaProjectRepository();
            const listAllProjectsUseCase = new ListAllProjectsUseCase(
                prismaProjectRepository
            );

            const projects = await listAllProjectsUseCase.execute();

            return response.json(projects);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
