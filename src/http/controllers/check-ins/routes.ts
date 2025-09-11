import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { validade } from './validate'
import { create } from './create'
import { metrics } from './metrics'
import { history } from './history'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/metrics', metrics)
  app.get('/check-ins/history', history)
  app.post('/check-ins/:gymId/create', create)
  app.patch('/check-ins/:checkInId/validade', validade)
}
