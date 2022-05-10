import { Project } from "../../../domain/project";
import { IProjectRepository } from "../../repositories/project-repository";

interface IUpdateProjectUseCaseRequest {
    title: string;
    description: string;
    userId: string;
}

export class UpdateProjectUseCase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(
        { title, description, userId }: IUpdateProjectUseCaseRequest,
        id: string
    ): Promise<void> {
        const searchedProject = await this.projectRepository.findById(id);

        if (!searchedProject) {
            throw new Error("Unable to find project");
        }

        const project = new Project({ title, description, userId }, id);
        await this.projectRepository.update(project, id);
    }
}
