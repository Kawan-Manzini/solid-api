import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { describe } from 'node:test'
import { expect, it, test } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'

//Unit Testing

describe('Register useCase', () => {
  it('should be hash user password upon registragion', async () => {

    const registerUser = new RegisterUseCase({
      async findByEmail(email) {
          return null
      },
      async create(data) {
          return {
            id: 'user-1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash ?? '',
            created_at: new Date()
          }
      },
    })

    const { user } = await registerUser.execute({
      name: 'Jhon Doe',
      email: 'johnDue@example.com',
      password: '123456'
    })

    if (!user.password_hash) {
      throw new Error('Senha não definida para este usuário');
    }

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    );
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})