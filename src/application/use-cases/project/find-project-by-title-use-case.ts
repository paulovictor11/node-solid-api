import { Project } from "../../../domain/project";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { MissingParamError } from "../../../utils/errors/missing-param-error";
import { IProjectRepository } from "../../repositories/domain/project-repository";

export class FindProjectByTitleUseCase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(title: string): Promise<Project> {
        if (!title) {
            throw new MissingParamError("title");
        }

        const searchedProject = await this.projectRepository.findByTitle(title);
        if (!searchedProject) {
            throw new NotFoundError("project");
        }

        return searchedProject;
    }
}
