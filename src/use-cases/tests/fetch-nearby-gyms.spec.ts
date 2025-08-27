import { beforeEach, describe, expect, it } from 'vitest'

import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

// Unit Testing

// user location
// -23.5203019,-46.4121304

// distant gym
// -22.7308257,-45.5798784

// nearby gym
// -23.5198369,-46.411403

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })
  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'A melhor academia da região',
      phone: '11999999999',
      latitude: -23.5198369,
      longitude: -46.411403,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'A melhor academia da região',
      phone: '11999999999',
      latitude: -22.7308257,
      longitude: -45.5798784,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.5203019,
      userLongitude: -46.4121304,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
