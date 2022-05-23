import { IProjectRepository } from "../../application/repositories/domain/project-repository";
import { Project } from "../../domain/project";

export class InMemoryProjectRepository implements IProjectRepository {
    public items: Project[] = [];

    async findByTitle(title: string): Promise<Project | null> {
        const project = this.items.find((project) => project.title === title);

        if (!project) {
            return null;
        }

        return project;
    }

    async findById(id: string): Promise<Project | null> {
        const project = this.items.find((project) => project.id === id);

        if (!project) {
            return null;
        }

        return project;
    }

    async listAll(): Promise<Project[]> {
        return this.items;
    }

    async create(project: Project): Promise<void> {
        this.items.push(project);
    }

    async update(project: Project, id: string): Promise<void> {
        const index = this.items.findIndex((project) => project.id === id);
        this.items[index] = project;
    }

    async delete(id: string): Promise<void> {
        const index = this.items.findIndex((project) => project.id === id);
        this.items.splice(index, 1);
    }
}
