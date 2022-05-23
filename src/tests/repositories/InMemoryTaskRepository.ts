import { ITaskRepository } from "../../application/repositories/domain/task-repository";
import { Task } from "../../domain/task";

export class InMemoryTaskRepository implements ITaskRepository {
    public items: Task[] = [];

    async findByTitle(title: string): Promise<Task | null> {
        const task = this.items.find((task) => task.title === title);

        if (!task) {
            return null;
        }

        return task;
    }

    async findById(id: string): Promise<Task | null> {
        const task = this.items.find((task) => task.id === id);

        if (!task) {
            return null;
        }

        return task;
    }

    async listAll(): Promise<Task[]> {
        return this.items;
    }

    async create(task: Task): Promise<void> {
        this.items.push(task);
    }

    async update(task: Task, id: string): Promise<void> {
        const index = this.items.findIndex((task) => task.id === id);
        this.items[index] = task;
    }

    async delete(id: string): Promise<void> {
        const index = this.items.findIndex((task) => task.id === id);
        this.items.splice(index, 1);
    }
}
