import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

//Unit Testing

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    // system under test
    sut = new GetUserProfileUseCase(usersRepository)
  })
  it('should be able to get user profile', async () => {


    const userCreated = await usersRepository.create({
      name: 'John Doe',
      email: 'johnDoe@email.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      userId: userCreated.id
    })

    expect(user.id).toEqual(expect.any(String))

  })
  it('should not be able to get user profile with wrong id', async () => {
    expect(() => sut.execute({
      userId: 'non-existing-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)

  })
})