import type { CheckIn } from '@prisma/client'

import type { ICheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUsersCheckinHistoryUseCaseRequest {
  userId: string
  page: number
}
interface FetchUsersCheckinHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUsersCheckinHistoryUseCase {
  constructor(private checkInRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUsersCheckinHistoryUseCaseRequest): Promise<FetchUsersCheckinHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}
