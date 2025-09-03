// fastify-jwt.d.ts
import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      id: number
      name: string
      age: number
    } // user type is return type of `request.user` object
  }
}
