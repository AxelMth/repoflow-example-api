import Fastify, { type FastifyError } from 'fastify'
import { helloRoutes } from './routes/hello.js'
import { statsRoutes } from './routes/stats.js'

const app = Fastify({ logger: true })

app.get('/health', async () => {
  return { ok: true }
})

await app.register(helloRoutes)
await app.register(statsRoutes)

app.setErrorHandler((error: FastifyError, _request, reply) => {
  app.log.error(error)
  reply.status(error.statusCode ?? 500).send({ error: error.message })
})

const port = Number(process.env.PORT ?? 3001)

try {
  await app.listen({ port, host: '0.0.0.0' })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
