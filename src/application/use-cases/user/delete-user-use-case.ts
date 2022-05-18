import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { IUserRepository } from "../../repositories/user-repository";

export class DeleteUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(id: string): Promise<void> {
        const searchedUser = await this.userRepository.findById(id);

        if (!searchedUser) {
            throw new NotFoundError("user");
        }

        await this.userRepository.delete(id);
    }
}
