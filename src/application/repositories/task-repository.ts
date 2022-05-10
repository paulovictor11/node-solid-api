import { Task } from "../../domain/task";

export interface ITaskRepository {
    findById(id: string): Promise<Task | null>;
    listAll(): Promise<Task[]>;
    create(task: Task): Promise<void>;
    update(task: Task, id: string): Promise<void>;
    delete(id: string): Promise<void>;
}
