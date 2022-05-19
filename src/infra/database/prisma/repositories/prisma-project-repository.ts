import { IProjectRepository } from "../../../../application/repositories/domain/project-repository";
import { Project } from "../../../../domain/project";
import { Task } from "../../../../domain/task";
import { prisma } from "../prisma";

export class PrismaProjectRepository implements IProjectRepository {
    async findByTitle(title: string): Promise<Project | null> {
        const project = await prisma.project.findFirst({
            where: { title },
            include: {
                tasks: true,
            },
        });

        if (!project) {
            return null;
        }

        const tasks = project.tasks.map(
            (task) =>
                new Task(
                    {
                        title: task.title,
                        projectId: task.projectId,
                        assignedTo: task.assignedTo,
                        completed: task.completed,
                    },
                    task.id
                )
        );

        return new Project(
            {
                title: project.title,
                description: project.description,
                userId: project.userId,
                tasks,
            },
            project.id
        );
    }

    async findById(id: string): Promise<Project | null> {
        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                tasks: true,
            },
        });

        if (!project) {
            return null;
        }

        const tasks = project.tasks.map(
            (task) =>
                new Task(
                    {
                        title: task.title,
                        projectId: task.projectId,
                        assignedTo: task.assignedTo,
                        completed: task.completed,
                    },
                    task.id
                )
        );

        return new Project(
            {
                title: project.title,
                description: project.description,
                userId: project.userId,
                tasks,
            },
            project.id
        );
    }

    async listAll(): Promise<Project[]> {
        const projects = await prisma.project.findMany({
            orderBy: [
                {
                    createdAt: "asc",
                },
            ],
        });

        return projects.map(
            (project) =>
                new Project(
                    {
                        title: project.title,
                        description: project.description,
                        userId: project.userId,
                    },
                    project.id
                )
        );
    }

    async create(project: Project): Promise<void> {
        await prisma.project.create({
            data: {
                title: project.title,
                description: project.description,
                userId: project.userId,
            },
        });
    }

    async update(project: Project, id: string): Promise<void> {
        await prisma.project.update({
            where: { id },
            data: {
                title: project.title,
                description: project.description,
                userId: project.userId,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.project.delete({
            where: { id },
        });
    }
}
