import { IProjectRepository } from "../../repositories/project-repository";

export class DeleteProjectUseCase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(id: string): Promise<void> {
        const searchedProject = await this.projectRepository.findById(id);

        if (!searchedProject) {
            throw new Error("Unable to find project");
        }

        await this.projectRepository.delete(id);
    }
}
