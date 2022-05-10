import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { IControllerRepository } from "../../repositories/controller-repository";
import { ListAllTasksUseCase } from "../../use-cases/tasks/list-all-tasks-use-case";

export class ListAllTasksController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const prismaTaskRepository = new PrismaTaskRepository();
            const listAllTasksUseCase = new ListAllTasksUseCase(
                prismaTaskRepository
            );

            const tasks = await listAllTasksUseCase.execute();

            return response.json(tasks);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
