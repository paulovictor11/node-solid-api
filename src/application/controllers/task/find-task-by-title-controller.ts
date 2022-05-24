import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { FindTaskByIdUseCase } from "../../use-cases/tasks/find-task-by-id-use-case";
import { FindTaskByTitleUseCase } from "../../use-cases/tasks/find-task-by-title-use-case";

export class FindTaskByTitleController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { title } = request.body;

            const prismaTaskRespository = new PrismaTaskRepository();
            const findTaskByTitleUseCase = new FindTaskByTitleUseCase(
                prismaTaskRespository
            );

            const task = await findTaskByTitleUseCase.execute(title);

            return response.json(task);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
