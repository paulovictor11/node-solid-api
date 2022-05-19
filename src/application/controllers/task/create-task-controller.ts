import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { CreateTaskUseCase } from "../../use-cases/tasks/create-task-use-case";

export class CreateTaskController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { title, projectId, assignedTo, completed } = request.body;

            const prismaTaskRepository = new PrismaTaskRepository();
            const createTaskUseCase = new CreateTaskUseCase(
                prismaTaskRepository
            );

            await createTaskUseCase.execute({
                title,
                projectId,
                assignedTo,
                completed,
            });

            return response.send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
