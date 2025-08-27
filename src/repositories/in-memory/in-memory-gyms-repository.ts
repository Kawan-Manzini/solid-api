import { randomUUID } from 'node:crypto'

import { Prisma, Gym } from '@prisma/client'

import { IGymsRepository, FindManyNearbyParam } from '../gyms-repository'

import { getDistanceBetweenCoordinates } from '@/utills/get-distance-between-coordinates'

// https://martinfowler.com/bliki/InMemoryTestDatabase.html
export class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = []

  async findManyNearby(params: FindManyNearbyParam) {
    return this.items.filter((item) => {
      if (item.latitude === null || item.longitude === null) {
        return false
      }
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        { latitude: item.latitude, longitude: item.longitude },
      )

      return distance < 10
    })
  }

  async searchMany(query: string, page: number) {
    return this.items.filter((item) => item.title.includes(query)).slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
