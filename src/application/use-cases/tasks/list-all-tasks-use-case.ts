import { Task } from "../../../domain/task";
import { ITaskRepository } from "../../repositories/task-repository";

export class ListAllTasksUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(): Promise<Task[]> {
        return await this.taskRepository.listAll();
    }
}
