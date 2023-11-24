import { IUsersRepository, TUser, TUserCreate, TUserWhere } from "../users-repository";

export class InMemoryRepository implements IUsersRepository {
    public items: TUser[] = []
    async create(data: TUserCreate) {
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

    async findUnique(data: TUserWhere) {
        const { email } = data;
        const user = this.items.find((item) => item.email === email)
        if (!user) {
            return null
        }
        return user;
    }
}