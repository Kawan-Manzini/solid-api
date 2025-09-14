import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

import { InvalidCredencialsError } from '@/use-cases/errors/invalid-credencials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)
  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d'
        },
      },
    )

    return reply.setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    }).status(200).send({
      token,
    })
  } catch (error) {
    if (error instanceof InvalidCredencialsError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error // TODO: fix
  }
}
