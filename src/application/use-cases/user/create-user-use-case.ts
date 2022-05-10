import { User } from "../../../domain/user";
import { IUserRepository } from "../../repositories/user-repository";

interface ICreateUserUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute({
        name,
        email,
        password,
    }: ICreateUserUseCaseRequest): Promise<void> {
        if (!name) {
            throw new Error("Name is required");
        }

        if (!email) {
            throw new Error("Email is required");
        }

        if (!password) {
            throw new Error("Password is required");
        }

        const userAlreadyExists = await this.userRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = new User({ name, email, password });
        await this.userRepository.create(user);
    }
}
