import { beforeEach, describe, expect, it } from 'vitest'

import { SearchGymsUseCase } from '../search-gyms'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

// Unit Testing

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })
  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'Academia do JavaScript',
      description: 'A melhor academia da região',
      phone: '11999999999',
      latitude: -23.55052,
      longitude: -46.633308,
    })

    await gymsRepository.create({
      title: 'Academia do Node',
      description: 'A melhor academia da região',
      phone: '11999999999',
      latitude: -23.55052,
      longitude: -46.633308,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Academia do JavaScript' })])
  })
  it('should be able to search paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia ${i}`,
        description: 'A melhor academia da região',
        phone: '11999999999',
        latitude: -23.55052,
        longitude: -46.633308,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Academia',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Academia 21' }),
        expect.objectContaining({ title: 'Academia 22' }),
      ]),
    )
  })
})
