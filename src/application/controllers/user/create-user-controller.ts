import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { IControllerRepository } from "../../repositories/controller-repository";
import { CreateUserUseCase } from "../../use-cases/user/create-user-use-case";

export class CreateUserController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email, password } = request.body;

            const prismaUserRespository = new PrismaUserRepository();
            const createUserUseCase = new CreateUserUseCase(
                prismaUserRespository
            );

            await createUserUseCase.execute({ name, email, password });

            return response.status(201).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
