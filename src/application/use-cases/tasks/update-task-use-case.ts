import { Task } from "../../../domain/task";
import { MissingParamError } from "../../../utils/errors";
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
        const searchedTask = await this.taskRepository.findById(id);

        if (!searchedTask) {
            throw new MissingParamError("task id");
        }

        const task = new Task({ title, projectId, assignedTo, completed }, id);
        await this.taskRepository.update(task, id);
    }
}
