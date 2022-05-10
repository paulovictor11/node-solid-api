import { Project } from "../../domain/project";

export interface IProjectRepository {
    findById(id: string): Promise<Project | null>;
    listAll(): Promise<Project[]>;
    create(project: Project): Promise<void>;
    update(project: Project, id: string): Promise<void>;
    delete(id: string): Promise<void>;
}
