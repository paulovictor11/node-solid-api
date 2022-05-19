import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { DeleteUserUseCase } from "../../use-cases/user/delete-user-use-case";

export class DeleteUserController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const prismaUserRespository = new PrismaUserRepository();
            const deleteUserUseCase = new DeleteUserUseCase(
                prismaUserRespository
            );

            await deleteUserUseCase.execute(id);

            return response.send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
