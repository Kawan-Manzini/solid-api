import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utills/test/create-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to search nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)
    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Academia do John',
      description: 'A melhor academia da região',
      phone: '11999999999',
      latitude: -23.5198369,
      longitude: -46.411403,
    })
    // distant gym
    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Academia do Node',
      description: 'A melhor academia da região',
      phone: '11999999999',
      latitude: -22.7308257,
      longitude: -45.5798784,
    })

    const response = await request(app.server).get('/gyms/nearby').set('Authorization', `Bearer ${token}`).send({
      latitude: -23.5198369,
      longitude: -23.5198369,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual(expect.objectContaining({
      title: 'Academia do John',
    }))
  })
})