// src/routes/trip-routes.ts
import { FastifyInstance } from 'fastify';
import { TripsController } from '../controllers/trip-controller'; // Atualize o caminho conforme necessário
import { PrismaClient } from '@prisma/client'; // Use a versão padrão
import { PrismaTripsRepository } from '../impl/PrismaTripsRepository'; // Atualize o caminho conforme necessário

export async function tripRoutes(server: FastifyInstance) {
  const prisma = new PrismaClient();
  const tripsRepository = new PrismaTripsRepository(prisma);
  const tripsController = new TripsController(tripsRepository);

  server.post('/trips-y', async (req, res) => {
    try {
        await tripsController.create(req, res);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
