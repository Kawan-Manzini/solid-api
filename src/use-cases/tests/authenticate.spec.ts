import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '../authenticate'
import { InvalidCredencialsError } from '../errors/invalid-credencials-error'

//Unit Testing

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase
describe('Authenticate Use Case', () => {
  beforeEach(() => {
   usersRepository = new InMemoryUsersRepository()
    // system under test
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to Authenticate', async () => {


    await usersRepository.create({
      name: 'John Doe',
      email: 'johnDoe@email.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'johnDoe@email.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))

  })
  it('should be able to Authenticate with wrong email', async () => {
    expect(() => sut.execute({
      email: 'johnddoe@email.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredencialsError)

  })
  it('should be able to Authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johnDoe@email.com',
      password_hash: await hash('123456', 6)
    })

     expect(() => sut.execute({
      email: 'johnddoe@email.com',
      password: '12341256'
    })).rejects.toBeInstanceOf(InvalidCredencialsError)

  })

})