import { prisma } from "@/lib/prisma";
import  { Prisma } from "@prisma/client";


export class prismaUserRepository{

async create(data: Prisma.UserCreateInput){
  await prisma.user.create({
    data
  })
}

}