import { Task } from "../../../domain/task";
import { ITaskRepository } from "../../repositories/task-repository";

interface IUpdateTaskUseCaseRequest {
    title: string;
    projectId: string;
    assignedTo: string;
    completed: boolean;
}

export class UpdateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(
        { title, projectId, assignedTo, completed }: IUpdateTaskUseCaseRequest,
        id: string
    ): Promise<void> {
        const searchedTask = await this.taskRepository.findById(id);

        if (!searchedTask) {
            throw new Error("Unable to find task");
        }

        const task = new Task({ title, projectId, assignedTo, completed }, id);
        await this.taskRepository.update(task, id);
    }
}
