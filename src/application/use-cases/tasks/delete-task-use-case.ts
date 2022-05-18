import { MissingParamError } from "../../../utils/errors";
import { ITaskRepository } from "../../repositories/task-repository";

export class DeleteTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(id: string): Promise<void> {
        const searchedTask = await this.taskRepository.findById(id);

        if (!searchedTask) {
            throw new MissingParamError("task id");
        }

        await this.taskRepository.delete(id);
    }
}
