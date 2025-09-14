import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utills/test/create-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const checkinResponse = await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Academia do John',
      description: 'A melhor academia da região',
      phone: '11999999999',
      latitude: -23.522269,
      longitude: -46.408146,
    })

    expect(checkinResponse.statusCode).toEqual(201)
    expect(checkinResponse.body.user).toEqual(expect.objectContaining({
      email: 'johnDoe@email.com',
    }))
  })
})