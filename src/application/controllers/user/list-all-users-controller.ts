import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { ListAllUsersUseCase } from "../../use-cases/user/list-all-users-use-case";

export class ListAllUsersController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const prismaUserRespository = new PrismaUserRepository();
            const listAllUserUseCase = new ListAllUsersUseCase(
                prismaUserRespository
            );

            const users = await listAllUserUseCase.execute();

            return response.json(users);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
