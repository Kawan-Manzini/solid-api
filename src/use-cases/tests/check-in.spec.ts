import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from '../authenticate'
import { InvalidCredencialsError } from '../errors/invalid-credencials-error'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/check-ins-in-memory-repository'
import { CheckInUseCase } from '../checkin'

//Unit Testing

let checkInsRepository: InMemoryCheckInRepository
let sut: CheckInUseCase
describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    // system under test
    sut = new CheckInUseCase(checkInsRepository)
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1'
    })


    expect(checkIn.id).toEqual(expect.any(String))

  })
})