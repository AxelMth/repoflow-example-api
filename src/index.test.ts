import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { helloRoutes } from './routes/hello.js'
import { HelloResponseSchema } from '@repoflow-example/shared'

const app = Fastify()

beforeAll(async () => {
  await app.register(cors, { origin: '*' })
  await app.register(helloRoutes)
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('GET /api/hello', () => {
  it('returns a valid HelloResponse', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/hello',
    })
    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)
    const result = HelloResponseSchema.safeParse(body)
    expect(result.success).toBe(true)
  })
})

describe('GET /health', () => {
  it('returns ok', async () => {
    const response = await app.inject({ method: 'GET', url: '/health' })
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toEqual({ ok: true })
  })
})
