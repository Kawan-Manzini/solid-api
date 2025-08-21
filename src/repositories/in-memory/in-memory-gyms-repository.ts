import { Prisma, User, type Gym } from "@prisma/client";
import { randomUUID } from "node:crypto";
import type { IGymsRepository } from "../gyms-repository";

// https://martinfowler.com/bliki/InMemoryTestDatabase.html
export class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
