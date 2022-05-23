import { Task } from "../../../domain/task";
import { MissingParamError } from "../../../utils/errors";
import { ITaskRepository } from "../../repositories/domain/task-repository";

export class FindTaskByIdUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(id: string): Promise<Task | null> {
        if (!id) {
            throw new MissingParamError("task id");
        }

        return await this.taskRepository.findById(id);
    }
}
