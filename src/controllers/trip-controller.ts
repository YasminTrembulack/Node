import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaTripsRepository } from '../impl/PrismaTripsRepository'; 
import { TypeTripInfos } from '../types/trip'; 
import { z } from 'zod';

export class TripsController {
  constructor(private readonly tripsRepository: PrismaTripsRepository) {}


  public async create(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const tripData = TypeTripInfos.parse(req.body);

      var id = await this.tripsRepository.save(tripData);

      res.status(201).send({ tripId : id , message: 'Trip created successfully' });

    } catch (error) {
      
      if (error instanceof z.ZodError) {
        res.status(400).send({ errors: error.errors });
      } else {
        res.status(500).send({ error: 'Internal server error' });
      }
        console.log("ERRO");
    }
  }
}
