import { Task } from "../../../domain/task";
import { MissingParamError } from "../../../utils/errors";
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
            throw new MissingParamError("title");
        }

        if (!projectId) {
            throw new MissingParamError("project id");
        }

        if (!assignedTo) {
            throw new MissingParamError("user");
        }

        const task = new Task({ title, projectId, assignedTo, completed });
        await this.taskRepository.create(task);
    }
}
