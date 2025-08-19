import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { USerAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function Register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof USerAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });

    }
    throw error//TODO: fix
  }

  return reply.status(201).send();
}

