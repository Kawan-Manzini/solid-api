import { prisma } from "@/lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { hash } from "bcryptjs";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";

export async function Register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);
 

  try {

    const usersRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message });
    }

    return reply.status(500).send();
  }

  return reply.status(201).send();
}
