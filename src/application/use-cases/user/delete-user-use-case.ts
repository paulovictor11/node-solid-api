import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { MissingParamError } from "../../../utils/errors/missing-param-error";
import { IUserRepository } from "../../repositories/domain/user-repository";

export class DeleteUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(id: string): Promise<void> {
        if (!id) {
            throw new MissingParamError("user id");
        }

        const searchedUser = await this.userRepository.findById(id);
        if (!searchedUser) {
            throw new NotFoundError("user");
        }

        await this.userRepository.delete(id);
    }
}
