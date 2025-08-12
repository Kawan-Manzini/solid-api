import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyRequest, FastifyReply } from "fastify"
 



interface RegisterUseCaseRequest{
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password
}: RegisterUseCaseRequest){
  const password_hash = await hash(password, 6)
  
    const userWithSameEmail = await prisma.user.findUnique({
      where:{
        email,
      }
    })
  
    if(userWithSameEmail) {
      throw new Error('User with this email already exists')
    }
  
  
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash, // troque para password_hash quando hashear
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
  
    return { user }
}