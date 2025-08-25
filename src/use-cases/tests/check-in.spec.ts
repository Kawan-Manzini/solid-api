import { Decimal } from '@prisma/client/runtime'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CheckInUseCase } from '../checkin'

import { InMemoryCheckInRepository } from '@/repositories/in-memory/check-ins-in-memory-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

// Unit Testing

let gymsRepository: InMemoryGymsRepository
let checkInsRepository: InMemoryCheckInRepository
let sut: CheckInUseCase
describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    // system under test
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    vi.useFakeTimers()

    gymsRepository.items.push({
      id: 'gym-1',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: 0,
      userLongitude: 0,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 3, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should should be able to check in twice but in differente days', async () => {
    vi.setSystemTime(new Date(2023, 3, 1, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2023, 3, 2, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-2',
      title: '.Net Gym',
      description: '',
      phone: '',
      latitude: -23.522269,
      longitude: -46.408146,
    })
    // -23.522215, -46.408170

    // -23.5202489,-46.4116854
    expect(
      sut.execute({
        gymId: 'gym-2',
        userId: 'user-1',
        userLatitude: -23.5202489,
        userLongitude: -46.4116854,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
