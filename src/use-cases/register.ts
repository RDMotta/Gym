
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

type RegisterUseCase = {
    name: string,
    email: string,
    password: string
}

export async function registerUseCase(params: RegisterUseCase) {

    const { name, email, password } = params
    const existsEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (existsEmail) {
        throw new Error('e-mail already exists.')
    }

    const password_hash = await hash(password, 10)
    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        }
    })

}