import fastify from 'fastify';
import { PrismaClient } from "@prisma/client";
import { email } from 'zod';



export const app = fastify();

const prisma = new PrismaClient();
prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john.doe@example.com'
  }
})
