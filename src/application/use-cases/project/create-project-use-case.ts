import { IProjectRepository } from "../../repositories/project-repository";
import { Project } from "../../../domain/project";

interface ICreateProjectUseCaseRequest {
    title: string;
    description: string;
    userId: string;
}

export class CreateProjectUseCase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute({
        title,
        description,
        userId,
    }: ICreateProjectUseCaseRequest): Promise<void> {
        if (!title) {
            throw new Error("Title is required");
        }

        if (!description) {
            throw new Error("Description is required");
        }

        if (!userId) {
            throw new Error("User is required");
        }

        const project = new Project({ title, description, userId });
        await this.projectRepository.create(project);
    }
}
