import { Request, Response } from "express";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { FindProjectByIdUseCase } from "../../use-cases/project/find-project-by-id-use-case";

export class FindProjectByIdController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const prismaProjectRepository = new PrismaProjectRepository();
            const findProjectByIdUseCase = new FindProjectByIdUseCase(
                prismaProjectRepository
            );

            const project = await findProjectByIdUseCase.execute(id);

            return response.json(project);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
