import { ValidateCheckInUseCase } from '../validate-check-in'

import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeValidadeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckinRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
