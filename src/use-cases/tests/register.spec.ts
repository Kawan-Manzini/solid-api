import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from '../register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { USerAlreadyExistsError } from '../../use-cases/errors/user-already-exists-error'

//Unit Testing

describe('Register Use Case', () => {
  it('should to register ', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(usersRepository)
    const email = 'johnDue@example.com'

    const { user } = await registerUserCase.execute({
      name: 'Jhon Doe',
      email,
      password: '123456'
    })

  await expect(user.id).toEqual(expect.any(String))
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

   await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(USerAlreadyExistsError)
  })
})