import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { IProjectRepository } from "../../repositories/domain/project-repository";

export class DeleteProjectUseCase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(id: string): Promise<void> {
        const searchedProject = await this.projectRepository.findById(id);

        if (!searchedProject) {
            throw new NotFoundError("project");
        }

        await this.projectRepository.delete(id);
    }
}
