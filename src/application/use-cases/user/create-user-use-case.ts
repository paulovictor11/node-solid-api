import { User } from "../../../domain/user";
import { InvalidParamError, MissingParamError } from "../../../utils/errors";
import { IUserRepository } from "../../repositories/domain/user-repository";
import { IEmailValidatorRepository } from "../../repositories/helper/email-validator-repository";
import { IEncrypterRepository } from "../../repositories/helper/encrypter-repository";

interface ICreateUserUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private emailValidator: IEmailValidatorRepository,
        private encrypter: IEncrypterRepository
    ) {}

    async execute({
        name,
        email,
        password,
    }: ICreateUserUseCaseRequest): Promise<void> {
        if (!name) {
            throw new MissingParamError("name");
        }

        if (!this.emailValidator.isValid(email)) {
            throw new InvalidParamError("email");
        }

        if (!password) {
            throw new MissingParamError("password");
        }

        const userAlreadyExists = await this.userRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const hashedPassword = await this.encrypter.encrypt(password);
        await this.userRepository.create(
            new User({
                name,
                email,
                password: hashedPassword,
            })
        );
    }
}
