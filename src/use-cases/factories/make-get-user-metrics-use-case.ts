import { GetUserMetricsUseCase } from '../get-user-metrics'

import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckinRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMetricsUseCase
}
