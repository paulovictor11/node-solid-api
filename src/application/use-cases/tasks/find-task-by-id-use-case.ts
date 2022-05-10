import { Task } from "../../../domain/task";
import { ITaskRepository } from "../../repositories/task-repository";

export class FindTaskByIdUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(id: string): Promise<Task> {
        const searchedTask = await this.taskRepository.findById(id);

        if (!searchedTask) {
            throw new Error("Unable to find task");
        }

        return searchedTask;
    }
}
