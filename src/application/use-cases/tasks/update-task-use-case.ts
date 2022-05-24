import { Task } from "../../../domain/task";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { MissingParamError } from "../../../utils/errors/missing-param-error";
import { ITaskRepository } from "../../repositories/domain/task-repository";

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
        if (!id) {
            throw new MissingParamError("task id");
        }

        const searchedTask = await this.taskRepository.findById(id);
        if (!searchedTask) {
            throw new NotFoundError("task");
        }

        const task = new Task({ title, projectId, assignedTo, completed }, id);
        await this.taskRepository.update(task, id);
    }
}
