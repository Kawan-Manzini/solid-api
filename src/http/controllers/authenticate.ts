import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { USerAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredencialsError } from "@/use-cases/errors/invalid-credencials-error";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  });

  const {  email, password } = authenticateBodySchema.parse(request.body);
  try {
    const usersRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (error) {
    if(error instanceof InvalidCredencialsError){
      return reply.status(409).send({ message: error.message });

    }
      throw error//TODO: fix
    }

    return reply.status(200).send();
  }

