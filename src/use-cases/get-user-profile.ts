import type { User } from '@prisma/client'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

import type { IUsersRepository } from '@/repositories/users-repository'

interface GetUserProfileUseCaseRequest {
  userId: string
}
interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }
    return { user }
  }
}
