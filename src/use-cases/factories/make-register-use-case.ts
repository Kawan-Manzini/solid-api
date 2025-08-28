import { RegisterUseCase } from '../register'

import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUserRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
