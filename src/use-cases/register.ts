
import { IUsersRepository } from "@/infra/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/email-exists-error";

export type TRegisterUseCase = {
    name: string,
    email: string,
    password: string
}

export class RegisterUseCase {

    constructor(private usersRepository: IUsersRepository) { }

    async execute(params: TRegisterUseCase) {

        const { name, email, password } = params

        const existsEmail = await this.usersRepository.findUnique({ email });

        if (existsEmail) {
            throw new UserAlreadyExistsError()
        }

        const password_hash = await hash(password, 10);

        await this.usersRepository.create({
            name,
            email,
            password_hash,
        })
    }

}