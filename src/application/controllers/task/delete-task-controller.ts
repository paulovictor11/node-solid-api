import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { IControllerRepository } from "../../repositories/controller-repository";
import { DeleteTaskUseCase } from "../../use-cases/tasks/delete-task-use-case";

export class DeleteTaskController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const prismaTaskRepository = new PrismaTaskRepository();
            const deleteTaskUseCase = new DeleteTaskUseCase(
                prismaTaskRepository
            );

            await deleteTaskUseCase.execute(id);

            return response.send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
