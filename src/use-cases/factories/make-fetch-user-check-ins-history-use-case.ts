import { FetchUsersCheckinHistoryUseCase } from '../fetch-user-check-ins-history'

import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckinRepository()
  const useCase = new FetchUsersCheckinHistoryUseCase(checkInsRepository)

  return useCase
}
