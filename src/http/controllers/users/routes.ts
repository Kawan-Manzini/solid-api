import type { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { refreshToken } from './refresh'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/refresh-token', refreshToken)

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
