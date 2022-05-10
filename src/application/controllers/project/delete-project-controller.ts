import { Request, Response } from "express";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { IControllerRepository } from "../../repositories/controller-repository";
import { DeleteProjectUseCase } from "../../use-cases/project/delete-project-use-case";

export class DeleteProjectController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const prismaProjectRepository = new PrismaProjectRepository();
            const deleteProjectUseCase = new DeleteProjectUseCase(
                prismaProjectRepository
            );

            await deleteProjectUseCase.execute(id);

            return response.send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
