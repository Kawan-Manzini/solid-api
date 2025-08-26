import { beforeEach, describe, expect, it } from 'vitest'

import { FetchUsersCheckinHistoryUseCase } from '../fetch-user-check-ins-history'
import { getUserMetricsUseCase } from '../get-user-metrics'

import { InMemoryCheckInRepository } from '@/repositories/in-memory/check-ins-in-memory-repository'

// Unit Testing

let checkInsRepository: InMemoryCheckInRepository
let sut: getUserMetricsUseCase
describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new FetchUsersCheckinHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check in history', async () => {
    await checkInsRepository.create({
      gym_Id: 'gym-1',
      user_Id: 'user-1',
    })
    await checkInsRepository.create({
      gym_Id: 'gym-2',
      user_Id: 'user-1',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-1',
      page: 1,
    })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-1' }),
      expect.objectContaining({ gym_id: 'gym-2' }),
    ])
  })
  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_Id: `gym-${i}`,
        user_Id: 'user-1',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-1',
      page: 2,
    })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
