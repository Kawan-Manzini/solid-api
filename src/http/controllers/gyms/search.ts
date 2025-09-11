import z from 'zod'

import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchBodySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { query, page } = searchBodySchema.parse(request.body)

  const searchGymsUseCase = makeSearchGymsUseCase()
  const { gyms } = await searchGymsUseCase.execute({
    query, page
  })
  return reply.status(201).send({
    gyms
  })
}
