import z from 'zod'

import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryBodySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = checkInHistoryBodySchema.parse(request.body)

  const historyCheckInUseCase = makeFetchUserCheckInsHistoryUseCase()
  const { checkIns } = await historyCheckInUseCase.execute({
    page, userId: request.user.sub
  })
  return reply.status(201).send({
    checkIns
  })
}
