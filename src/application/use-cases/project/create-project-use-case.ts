import { IProjectRepository } from "../../repositories/project-repository";
import { Project } from "../../../domain/project";
import { MissingParamError } from "../../../utils/errors";

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
            throw new MissingParamError("title");
        }

        if (!description) {
            throw new MissingParamError("description");
        }

        if (!userId) {
            throw new MissingParamError("user id");
        }

        const project = new Project({ title, description, userId });
        await this.projectRepository.create(project);
    }
}
