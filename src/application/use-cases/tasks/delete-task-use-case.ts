import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { MissingParamError } from "../../../utils/errors";
import { ITaskRepository } from "../../repositories/domain/task-repository";

export class DeleteTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(id: string): Promise<void> {
        if (!id) {
            throw new MissingParamError("task id");
        }

        const searchedTask = await this.taskRepository.findById(id);
        if (!searchedTask) {
            throw new NotFoundError("task");
        }

        await this.taskRepository.delete(id);
    }
}
