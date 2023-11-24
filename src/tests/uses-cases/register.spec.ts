import { InMemoryRepository } from '@/infra/momory/users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/email-exists-error'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

describe('Use case register', () => {
    it('should be create a new user', async () => {
        const repository = new InMemoryRepository()
        const registerUseCase = new RegisterUseCase(repository)

        const user = await registerUseCase.execute({
            name: 'Robson',
            email: 'email28@email.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should be hash user password register', async () => {
        const repository = new InMemoryRepository()
        const registerUseCase = new RegisterUseCase(repository)

        let passwordHashResponse = ''
        const password = '123456'
        await registerUseCase.execute({
            name: 'Robson',
            email: 'email2@email.com',
            password
        }).then(data => {
            passwordHashResponse = data.password_hash
        })

        const isSamePassword = await compare(password, passwordHashResponse)
        expect(isSamePassword).toBe(true)
    })


    it('should not be able to register the same email', async () => {
        const repository = new InMemoryRepository()
        const registerUseCase = new RegisterUseCase(repository)


        const email = 'email2@email.com'
        await registerUseCase.execute({
            name: 'Robson',
            email,
            password: '123456'
        })

        expect(() =>
            registerUseCase.execute({
                name: 'James',
                email,
                password: '123452213216',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})