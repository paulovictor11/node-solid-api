import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { IControllerRepository } from "../../repositories/controller-repository";
import { FindUserByIdUseCase } from "../../use-cases/user/find-user-by-id-use-case";

export class FindUserByIdController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const prismaUserRespository = new PrismaUserRepository();
            const findUserByIdUseCase = new FindUserByIdUseCase(
                prismaUserRespository
            );

            const user = await findUserByIdUseCase.execute(id);

            return response.json(user);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
