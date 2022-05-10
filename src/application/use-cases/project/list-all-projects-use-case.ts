import { Project } from "../../../domain/project";
import { IProjectRepository } from "../../repositories/project-repository";

export class ListAllProjectsUseCase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(): Promise<Project[]> {
        return await this.projectRepository.listAll();
    }
}
