import { prisma } from "@/lib/prisma";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import type { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";




interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

//SOLID

//D - Dependency Inversion Principle

export class RegisterUseCase {
  /**
   *
   */
  constructor(
    private _usersRepository: UsersRepository
  ) { }
  async execute({
    name,
    email,
    password
  }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    if (userWithSameEmail) {
      throw new Error('User with this email already exists')
    }


    await this._usersRepository.create({
      name,
      email,
      password_hash
    })


  }

}

