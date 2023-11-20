import type { Prisma, User } from '@prisma/client';
import { IUsersRepository } from "../users-repository";

export class InMemoryRepository implements IUsersRepository {
    public items: User[] = []
    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: 'new-user-1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date(),
        }
        this.items.push(user)
        return user
    }

    async findUnique(data: Prisma.UserWhereUniqueInput) {
        const { email } = data;
        const user = this.items.find((item) => item.email === email)
        if (!user) {
            return null
        }
        return user;
    }
}