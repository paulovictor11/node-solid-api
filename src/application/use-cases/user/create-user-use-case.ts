import { User } from "../../../domain/user";
import { InvalidParamError, MissingParamError } from "../../../utils/errors";
import { EmailValidator } from "../../../utils/helpers/email-validator";
import { IUserRepository } from "../../repositories/user-repository";

interface ICreateUserUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private emailValidator: EmailValidator
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

        const user = new User({ name, email, password });
        await this.userRepository.create(user);
    }
}
