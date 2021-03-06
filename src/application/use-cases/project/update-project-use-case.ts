import { Project } from "../../../domain/project";
import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { MissingParamError } from "../../../utils/errors/missing-param-error";
import { IProjectRepository } from "../../repositories/domain/project-repository";

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
        if (!id) {
            throw new MissingParamError("project id");
        }

        const searchedProject = await this.projectRepository.findById(id);
        if (!searchedProject) {
            throw new NotFoundError("project");
        }

        const project = new Project({ title, description, userId }, id);
        await this.projectRepository.update(project, id);
    }
}
