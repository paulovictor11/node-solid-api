import { Request, Response } from "express";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { FindProjectByTitleUseCase } from "../../use-cases/project/find-project-by-title-use-case";

export class FindProjectByTitleController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { title } = request.body;

            const prismaProjectRepository = new PrismaProjectRepository();
            const findProjectByTitleUseCase = new FindProjectByTitleUseCase(
                prismaProjectRepository
            );

            const project = await findProjectByTitleUseCase.execute(title);

            return response.json(project);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
