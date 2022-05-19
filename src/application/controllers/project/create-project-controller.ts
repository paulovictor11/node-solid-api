import { Request, Response } from "express";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { CreateProjectUseCase } from "../../use-cases/project/create-project-use-case";

export class CreateProjectController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { title, description, userId } = request.body;

            const prismaProjectRepository = new PrismaProjectRepository();
            const createProjectUseCase = new CreateProjectUseCase(
                prismaProjectRepository
            );

            await createProjectUseCase.execute({ title, description, userId });

            return response.send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
