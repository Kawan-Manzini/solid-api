import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utills/test/create-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to search a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Academia do John',
      description: 'A melhor academia da região',
      phone: '11999999999',
      latitude: -23.522269,
      longitude: -46.408146,
    })
    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Academia do Node',
      description: 'A melhor academia da região',
      phone: '11999999999',
      latitude: -23.522269,
      longitude: -46.408146,
    })

    const response = await request(app.server).get('/gyms/search').set('Authorization', `Bearer ${token}`).send({
      query: 'Node',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual(expect.objectContaining({
      title: 'Academia do Node',
    }))
  })
})