import { hash } from 'bcryptjs'
import type { User } from '@prisma/client'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import type { IUsersRepository } from '@/repositories/users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

// SOLID

// D - Dependency Inversion Principle

export class RegisterUseCase {
  /**
   *
   */
  constructor(private _usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this._usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this._usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
