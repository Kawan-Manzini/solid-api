import { Prisma, type User } from '@prisma/client'

import type { IUsersRepository } from '../users-repository'

import { prisma } from '@/lib/prisma'

export class PrismaUserRepository implements IUsersRepository {
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string): Promise<User | null> {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return userWithSameEmail
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
