import type { Prisma, User } from "@prisma/client";

export interface IUsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findUnique(data: Prisma.UserWhereUniqueInput): Promise<User | null>
}