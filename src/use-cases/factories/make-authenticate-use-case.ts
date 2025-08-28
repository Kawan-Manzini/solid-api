import { AuthenticateUseCase } from '../authenticate'
import { RegisterUseCase } from '../register'

import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
