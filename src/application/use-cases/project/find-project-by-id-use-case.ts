import { Project } from "../../../domain/project";
import { IProjectRepository } from "../../repositories/project-repository";

export class FindProjectByIdUseCase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(id: string): Promise<Project> {
        const searchedProject = await this.projectRepository.findById(id);

        if (!searchedProject) {
            throw new Error("Unable to find project");
        }

        return searchedProject;
    }
}
