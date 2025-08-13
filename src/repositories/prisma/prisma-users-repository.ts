import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import type { UsersRepository } from "../users-repository";


export class PrismaUserRepository implements UsersRepository {

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })
    return user
  }

}