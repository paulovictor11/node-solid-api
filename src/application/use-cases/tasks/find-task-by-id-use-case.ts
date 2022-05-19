import { Task } from "../../../domain/task";
import { MissingParamError } from "../../../utils/errors";
import { ITaskRepository } from "../../repositories/domain/task-repository";

export class FindTaskByIdUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(id: string): Promise<Task> {
        const searchedTask = await this.taskRepository.findById(id);

        if (!searchedTask) {
            throw new MissingParamError("task id");
        }

        return searchedTask;
    }
}
