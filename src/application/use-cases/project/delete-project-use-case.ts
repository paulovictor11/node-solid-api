import { NotFoundError } from "../../../presentation/errors/not-found-error";
import { MissingParamError } from "../../../utils/errors";
import { IProjectRepository } from "../../repositories/domain/project-repository";

export class DeleteProjectUseCase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(id: string): Promise<void> {
        if (!id) {
            throw new MissingParamError("project id");
        }

        const searchedProject = await this.projectRepository.findById(id);
        if (!searchedProject) {
            throw new NotFoundError("project");
        }

        await this.projectRepository.delete(id);
    }
}
