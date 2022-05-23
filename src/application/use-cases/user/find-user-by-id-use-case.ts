import { User } from "../../../domain/user";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { MissingParamError } from "../../../utils/errors";
import { IUserRepository } from "../../repositories/domain/user-repository";

export class FindUserByIdUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(id: string): Promise<User> {
        if (!id) {
            throw new MissingParamError("user id");
        }

        const searchedUser = await this.userRepository.findById(id);
        if (!searchedUser) {
            throw new NotFoundError("user");
        }

        return searchedUser;
    }
}
