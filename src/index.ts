import Fastify from 'fastify'
import cors from '@fastify/cors'
import { helloRoutes } from './routes/hello.js'

const app = Fastify({ logger: true })

const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173'

await app.register(cors, {
  origin: corsOrigin,
})

app.get('/health', async () => {
  return { ok: true }
})

await app.register(helloRoutes)

app.setErrorHandler((error, _request, reply) => {
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
