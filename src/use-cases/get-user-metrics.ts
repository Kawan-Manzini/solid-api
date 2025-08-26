import type { ICheckInsRepository } from '@/repositories/check-ins-repository'

interface getUserMetricsUseCaseRequest {
  userId: string
}
interface getUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class getUserMetricsUseCase {
  constructor(private checkInRepository: ICheckInsRepository) {}

  async execute({ userId }: getUserMetricsUseCaseRequest): Promise<getUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
