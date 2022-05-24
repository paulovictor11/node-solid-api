import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { Encrypter } from "../../../utils/helpers/encrypter";
import { TokenGenerator } from "../../../utils/helpers/token-generator";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { LoginUseCase } from "../../use-cases/auth/login-use-case";

export class LoginController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password } = request.body;

            const prismaUserRespository = new PrismaUserRepository();
            const encrypter = new Encrypter();
            const tokenGenerator = new TokenGenerator();
            const loginUseCase = new LoginUseCase(
                prismaUserRespository,
                encrypter,
                tokenGenerator
            );

            const result = await loginUseCase.execute({ email, password });
            return response.send(result);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
