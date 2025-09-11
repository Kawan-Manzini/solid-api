import z from 'zod'

import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeValidadeCheckInUseCase } from '@/use-cases/factories/make-validade-check-in-use-case'

export async function validade(request: FastifyRequest, reply: FastifyReply) {
  const validadeCheckInParamsSchema = z.object({
    checkInId: z.string().uuid()
  })

  const { checkInId } = validadeCheckInParamsSchema.parse(request.params)
  const validateCheckInUseCase = makeValidadeCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId
  })
  return reply.status(201).send()
}
