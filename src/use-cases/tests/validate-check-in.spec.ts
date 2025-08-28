import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'

import { ValidateCheckInUseCase } from '../validate-check-in'

import { InMemoryCheckInRepository } from '@/repositories/in-memory/check-ins-in-memory-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_Id: 'gym-01',
      user_Id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validade check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40)) // January is month 0

    const createdCheckIn = await checkInsRepository.create({
      gym_Id: 'gym-01',
      user_Id: 'user-01',
    })

    vi.advanceTimersByTime(1000 * 60 * 21)

    expect(() => sut.execute({ checkInId: createdCheckIn.id })).rejects.toBeInstanceOf(Error)
  })
})
