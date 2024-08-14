// https://fastify.dev/docs/latest/Reference/TypeScript/

// // ---------------- Aula 01 ----------------
// import fastify from 'fastify'

// const server = fastify();

// server.get('/', () => {
//     return "Olá mundo!"
// })

// server.listen({ port: 3333 }).then(() =>
//     console.log("Server Running...")
// )

// // ---------------- Código do fastify ----------------
// import fastify from 'fastify'

// const server = fastify()

// server.get('/ping', async (request, reply) => {
//   return 'pong\n'
// })

// server.listen({ port: 8080 }, (err, address) => {
//   if (err) {
//     console.error(err)
//     process.exit(1)
//   }
//   console.log(`Server listening at ${address}`)
// })



// ---------------- NLW ----------------

import fastify from 'fastify'
// import cors from '@fastify/cors'

const server = fastify()

// server.register(cors, {
//     origin: '*',
// })


