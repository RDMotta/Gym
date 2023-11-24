import type { Prisma, User } from "@prisma/client";

export type TUserCreate = Prisma.UserCreateInput;
export type TUserWhere = Prisma.UserWhereUniqueInput;
export type TUser = User;

export interface IUsersRepository {
    create(data: TUserCreate): Promise<TUser>
    findUnique(data: TUserWhere): Promise<TUser | null>
}