import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { UpdateUserUseCase } from "../../use-cases/user/update-user-use-case";

export class UpdateUserController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const { name, email, password } = request.body;

            const prismaUserRespository = new PrismaUserRepository();
            const updateUserUseCase = new UpdateUserUseCase(
                prismaUserRespository
            );

            await updateUserUseCase.execute({ name, email, password }, id);

            return response.send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
