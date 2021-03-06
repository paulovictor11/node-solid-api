import { User } from "../../../domain/user";
import { IUserRepository } from "../../repositories/domain/user-repository";

export class ListAllUsersUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(): Promise<User[]> {
        return await this.userRepository.listAll();
    }
}
