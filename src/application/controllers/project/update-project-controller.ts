import { Request, Response } from "express";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { IControllerRepository } from "../../repositories/controller-repository";
import { UpdateProjectUseCase } from "../../use-cases/project/update-project-use-case";

export class UpdateProjectController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const { title, description, userId } = request.body;

            const prismaProjectRepository = new PrismaProjectRepository();
            const updateProjectUseCase = new UpdateProjectUseCase(
                prismaProjectRepository
            );

            await updateProjectUseCase.execute(
                { title, description, userId },
                id
            );

            return response.send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
