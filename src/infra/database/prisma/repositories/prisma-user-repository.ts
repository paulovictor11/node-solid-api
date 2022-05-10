import { IUserRepository } from "../../../../application/repositories/user-repository";
import { User } from "../../../../domain/user";
import { prisma } from "../prisma";

export class PrismaUserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return null;
        }

        return new User(
            {
                name: user.name,
                email: user.email,
                password: user.password,
            },
            user.id
        );
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return null;
        }

        return new User(
            {
                name: user.name,
                email: user.email,
                password: user.password,
            },
            user.id
        );
    }

    async listAll(): Promise<User[]> {
        const users = await prisma.user.findMany({
            orderBy: [
                {
                    createdAt: "asc",
                },
            ],
        });
        return users.map(
            (user) =>
                new User(
                    {
                        name: user.name,
                        email: user.email,
                        password: user.password,
                    },
                    user.id
                )
        );
    }

    async create(user: User): Promise<void> {
        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });
    }

    async update(user: User, id: string): Promise<void> {
        await prisma.user.update({
            where: { id },
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id },
        });
    }
}
