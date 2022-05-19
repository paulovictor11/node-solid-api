import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma.task.repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { FindTaskByIdUseCase } from "../../use-cases/tasks/find-task-by-id-use-case";

export class FindTaskByIdController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const prismaTaskRespository = new PrismaTaskRepository();
            const findTaskByIdUseCase = new FindTaskByIdUseCase(
                prismaTaskRespository
            );

            const task = await findTaskByIdUseCase.execute(id);

            return response.json(task);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
