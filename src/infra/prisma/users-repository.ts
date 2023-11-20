import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { IUsersRepository } from "../users-repository";

export class PrismaUsersRepository implements IUsersRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({ data })

        return user
    }

    async findUnique(data: Prisma.UserWhereUniqueInput) {
        const { email } = data;
        const existsEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        return existsEmail;

    }
}