import { User } from "../../../domain/user";
import { IUserRepository } from "../../repositories/user-repository";

export class FindUserByIdUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(id: string): Promise<User> {
        const searchedUser = await this.userRepository.findById(id);

        if (!searchedUser) {
            throw new Error("Unable to find user");
        }

        return searchedUser;
    }
}
