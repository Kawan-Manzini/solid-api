import { prisma } from "@/lib/prisma";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import type { IUsersRepository } from "@/repositories/users-repository";
import type { User } from "@prisma/client";
import { hash } from "bcryptjs";




interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse{
  user: User;
}

//SOLID

//D - Dependency Inversion Principle

export class RegisterUseCase {
  /**
   *
   */
  constructor(
    private _usersRepository: IUsersRepository
  ) { }
  async execute({
    name,
    email,
    password
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this._usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists')
    }

    const user = await this._usersRepository.create({
      name,
      email,
      password_hash
    })

    return {user}
  }

}

