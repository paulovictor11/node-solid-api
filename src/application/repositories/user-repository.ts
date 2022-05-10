import { User } from "../../domain/user";

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    listAll(): Promise<User[]>;
    create(user: User): Promise<void>;
    update(user: User, id: string): Promise<void>;
    delete(id: string): Promise<void>;
}
