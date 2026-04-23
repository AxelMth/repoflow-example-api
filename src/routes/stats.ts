import type { FastifyInstance } from 'fastify'
import { StatsResponseSchema } from 'repoflow-example-shared'

const startedAt = Date.now()

export async function statsRoutes(app: FastifyInstance): Promise<void> {
  app.get('/api/stats', async (_request, reply) => {
    const body = StatsResponseSchema.parse({
      uptime: (Date.now() - startedAt) / 1000,
      version: process.env.npm_package_version ?? '0.0.0',
      nodeVersion: process.version,
    })
    return reply.send(body)
  })
}
