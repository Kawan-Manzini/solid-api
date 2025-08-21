import { beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/check-ins-in-memory-repository'
import { CheckInUseCase } from '../checkin'
import { afterEach } from 'node:test'

//Unit Testing

let checkInsRepository: InMemoryCheckInRepository
let sut: CheckInUseCase
describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    // system under test
    sut = new CheckInUseCase(checkInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1'
    })
    expect(checkIn.id).toEqual(expect.any(String))

  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 3, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1'
    })

    await expect(() => sut.execute({
      gymId: 'gym-1',
      userId: 'user-1'
    })).rejects.toBeInstanceOf(Error)

  })

  it('should should be able to check in twice but in differente days', async () => {
    vi.setSystemTime(new Date(2023, 3, 1, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1'
    })

    vi.setSystemTime(new Date(2023, 3, 2, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1'
    })

    expect(checkIn.id).toEqual(expect.any(String))

  })
})