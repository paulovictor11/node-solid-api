import { IUserRepository } from "../../application/repositories/domain/user-repository";
import { User } from "../../domain/user";

export class InMemoryUserRepository implements IUserRepository {
    public items: User[] = [];

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find((user) => user.email === email);

        if (!user) {
            return null;
        }

        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = this.items.find((user) => user.id === id);

        if (!user) {
            return null;
        }

        return user;
    }

    async listAll(): Promise<User[]> {
        return this.items;
    }

    async create(user: User): Promise<void> {
        this.items.push(user);
    }

    async update(user: User, id: string): Promise<void> {
        const index = this.items.findIndex((user) => user.id === id);
        this.items[index] = user;
    }

    async delete(id: string): Promise<void> {
        const index = this.items.findIndex((user) => user.id === id);
        this.items.splice(index, 1);
    }
}
