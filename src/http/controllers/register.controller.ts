import { PrismaUsersRepository } from "@/infra/prisma/users-repository"
import { RegisterUseCase } from "@/use-cases/register"
import { FastifyReply, FastifyRequest } from "fastify"

import { z } from "zod"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const register = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = register.parse(request.body)
    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)
        await registerUseCase.execute({ name, email, password })
    } catch (err) {
        return reply.status(409).send()
    }
    return reply.status(201).send()
}