import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from '../register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { USerAlreadyExistsError } from '../../use-cases/errors/user-already-exists-error'

//Unit Testing
let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should to register ', async () => {

 
    const email = 'johnDue@example.com'

    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email,
      password: '123456'
    })

   expect(user.id).toEqual(expect.any(String))
  })

   it('should not be able to register with same email twice', async () => {


    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(USerAlreadyExistsError)
  })
})