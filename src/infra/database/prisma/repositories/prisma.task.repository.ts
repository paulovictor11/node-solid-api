import { ITaskRepository } from "../../../../application/repositories/task-repository";
import { Task } from "../../../../domain/task";
import { prisma } from "../prisma";

export class PrismaTaskRepository implements ITaskRepository {
    async findByTitle(title: string): Promise<Task | null> {
        const task = await prisma.task.findFirst({
            where: { title },
        });

        if (!task) {
            return null;
        }

        return new Task(
            {
                title: task.title,
                projectId: task.projectId,
                assignedTo: task.assignedTo,
                completed: task.completed,
            },
            task.id
        );
    }

    async findById(id: string): Promise<Task | null> {
        const task = await prisma.task.findUnique({
            where: { id },
        });

        if (!task) {
            return null;
        }

        return new Task(
            {
                title: task.title,
                projectId: task.projectId,
                assignedTo: task.assignedTo,
                completed: task.completed,
            },
            task.id
        );
    }

    async listAll(): Promise<Task[]> {
        const tasks = await prisma.task.findMany({
            orderBy: [
                {
                    createdAt: "asc",
                },
            ],
        });
        return tasks.map(
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
    }

    async create(task: Task): Promise<void> {
        await prisma.task.create({
            data: {
                title: task.title,
                projectId: task.projectId,
                assignedTo: task.assignedTo,
                completed: task.completed,
            },
        });
    }

    async update(task: Task, id: string): Promise<void> {
        await prisma.task.update({
            where: { id },
            data: {
                title: task.title,
                projectId: task.projectId,
                assignedTo: task.assignedTo,
                completed: task.completed,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.task.delete({
            where: { id },
        });
    }
}
