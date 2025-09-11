import z from 'zod'

import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  })
  const createBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    })

  })

  const { latitude, longitude } = createBodySchema.parse(request.body)

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const createCheckInUseCase = makeCheckInUseCase()

  await createCheckInUseCase.execute({
    gymId, userLatitude: latitude, userLongitude: longitude, userId: request.user.sub
  })
  return reply.status(201).send()
}
