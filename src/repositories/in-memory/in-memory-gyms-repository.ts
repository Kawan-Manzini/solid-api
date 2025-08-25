import { Prisma, Gym } from "@prisma/client";
import { IGymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";

// https://martinfowler.com/bliki/InMemoryTestDatabase.html
export class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
