import { User } from "../../../domain/user";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { IUserRepository } from "../../repositories/domain/user-repository";

interface IUpdateUserUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class UpdateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(
        { name, email, password }: IUpdateUserUseCaseRequest,
        id: string
    ): Promise<void> {
        const searchedUser = await this.userRepository.findById(id);

        if (!searchedUser) {
            throw new NotFoundError("user");
        }

        const user = new User({ name, email, password }, id);
        await this.userRepository.update(user, id);
    }
}
