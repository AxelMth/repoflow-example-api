import type { FastifyInstance } from 'fastify'
import { HelloResponseSchema } from '@repoflow-example/shared'

export async function helloRoutes(app: FastifyInstance): Promise<void> {
  app.get('/api/hello', async (_request, reply) => {
    const body = HelloResponseSchema.parse({
      message: `Hello from Fastify at ${new Date().toISOString()}`,
      timestamp: new Date().toISOString(),
    })
    return reply.send(body)
  })
}
