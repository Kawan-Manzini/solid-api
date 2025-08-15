import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { describe } from 'node:test'
import { expect, it, test } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { USerAlreadyExistsError } from './user-already-exists-error'

//Unit Testing

describe('Register useCase', () => {
  it('should to register ', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(usersRepository)
    const email = 'johnDue@example.com'

    const { user } = await registerUserCase.execute({
      name: 'Jhon Doe',
      email,
      password: '123456'
    })

   expect(user.id).toEqual(expect.any(String))
  })

   it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(USerAlreadyExistsError)
  })
})