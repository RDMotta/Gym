
import { hash } from "bcryptjs";

export type TRegisterUseCase = {
    name: string,
    email: string,
    password: string
}

export class RegisterUseCase {

    constructor(private usersRepository: any) { }

    async execute(params: TRegisterUseCase) {

        const { name, email, password } = params

        const existsEmail = await this.usersRepository.findUnique({ email });

        if (existsEmail) {
            throw new Error('e-mail already exists.')
        }

        const password_hash = await hash(password, 10);

        await this.usersRepository.create({
            name,
            email,
            password_hash,
        })
    }

}