import { prisma } from "@/lib/prisma";
import { IUsersRepository, TUserCreate, TUserWhere } from "../users-repository";

export class PrismaUsersRepository implements IUsersRepository {
    async create(data: TUserCreate) {
        const user = await prisma.user.create({ data })

        return user
    }

    async findUnique(data: TUserWhere) {
        const { email } = data;
        const existsEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        return existsEmail;
    }
}