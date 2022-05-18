import { Project } from "../../../domain/project";
import { MissingParamError } from "../../../utils/errors";
import { IProjectRepository } from "../../repositories/project-repository";

export class FindProjectByIdUseCase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(id: string): Promise<Project> {
        const searchedProject = await this.projectRepository.findById(id);

        if (!searchedProject) {
            throw new MissingParamError("project id");
        }

        return searchedProject;
    }
}
