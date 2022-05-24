import { Task } from "../../../domain/task";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { MissingParamError } from "../../../utils/errors/missing-param-error";
import { ITaskRepository } from "../../repositories/domain/task-repository";

export class FindTaskByTitleUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(title: string): Promise<Task | null> {
        if (!title) {
            throw new MissingParamError("title");
        }

        const searchedTask = await this.taskRepository.findByTitle(title);
        if (!searchedTask) {
            throw new NotFoundError("task");
        }

        return searchedTask;
    }
}
