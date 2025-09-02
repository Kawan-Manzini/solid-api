import { CheckInUseCase } from '../checkin'

import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckinRepository()
  const gymsRespository = new PrismaGymsRepository()
  const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRespository)

  return checkInUseCase
}
