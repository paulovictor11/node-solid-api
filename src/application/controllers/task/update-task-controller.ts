import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { UpdateTaskUseCase } from "../../use-cases/tasks/update-task-use-case";

export class UpdateTaskController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const { title, projectId, assignedTo, completed } = request.body;

            const prismaTaskRepository = new PrismaTaskRepository();
            const updateTaskUseCase = new UpdateTaskUseCase(
                prismaTaskRepository
            );

            await updateTaskUseCase.execute(
                { title, projectId, assignedTo, completed },
                id
            );

            return response.send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpeced Error",
            });
        }
    }
}
