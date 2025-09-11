
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {

  const metricsCheckInUseCase = makeGetUserMetricsUseCase()
  const { checkInsCount } = await metricsCheckInUseCase.execute({
    userId: request.user.sub
  })
  return reply.status(201).send({
    checkInsCount
  })
}
