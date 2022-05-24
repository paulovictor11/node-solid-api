import { Task } from "../../../domain/task";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { MissingParamError } from "../../../utils/errors/missing-param-error";
import { ITaskRepository } from "../../repositories/domain/task-repository";

export class FindTaskByIdUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(id: string): Promise<Task | null> {
        if (!id) {
            throw new MissingParamError("task id");
        }

        const searchedTask = await this.taskRepository.findById(id);
        if (!searchedTask) {
            throw new NotFoundError("task");
        }

        return searchedTask;
    }
}
