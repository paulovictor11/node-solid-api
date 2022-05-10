import { Task } from "../../../domain/task";
import { ITaskRepository } from "../../repositories/task-repository";

interface ICreateTaskUseCaseRequest {
    title: string;
    projectId: string;
    assignedTo: string;
    completed: boolean;
}

export class CreateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute({
        title,
        projectId,
        assignedTo,
        completed = false,
    }: ICreateTaskUseCaseRequest): Promise<void> {
        if (!title) {
            throw new Error("Title is required");
        }

        if (!projectId) {
            throw new Error("Project is required");
        }

        if (!assignedTo) {
            throw new Error("User is required");
        }

        if (!title) {
            throw new Error("Title is required");
        }

        const task = new Task({ title, projectId, assignedTo, completed });
        await this.taskRepository.create(task);
    }
}
