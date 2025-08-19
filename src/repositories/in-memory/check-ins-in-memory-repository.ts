import { Prisma, CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

// https://martinfowler.com/bliki/InMemoryTestDatabase.html
export class InMemoryCheckInRepository implements ICheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_Id: data.user_Id,
      gym_Id: data.gym_Id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    }
    this.items.push(checkIn)

    return checkIn
  }
}