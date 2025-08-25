import { beforeEach, describe, expect, it } from 'vitest'

import { CreateGymUseCase } from '../create-gym'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

// Unit Testing
let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('should to register ', async () => {
    const { gym } = await sut.execute({
      title: 'Academia do John',
      description: 'A melhor academia da região',
      phone: '11999999999',
      latitude: -23.55052,
      longitude: -46.633308,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
