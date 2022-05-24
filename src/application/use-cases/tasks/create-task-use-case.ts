import { Task } from "../../../domain/task";
import { MissingParamError } from "../../../utils/errors/missing-param-error";
import { ITaskRepository } from "../../repositories/domain/task-repository";

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

        await this.taskRepository.create(
            new Task({ title, projectId, assignedTo, completed })
        );
    }
}
