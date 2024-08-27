import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from "zod"
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";


export async function confirmTrip(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/confirm',{
        schema: {
            params: z.object({
              tripId: z.string().uuid()
            })
        }
    } ,async (request, reply) => {
        const { tripId } = request.params;

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId,
            },
            include: {
                participant: {
                    where: {
                        is_owner: false
                    }
                }
            }
        })

        if(!trip){
            throw new ClientError('Trip not found.')
        }

        if(trip.is_confirmed){
            return reply.redirect(`http://localhost:3000/trips/${tripId}`)
        }

        await prisma.trip.update({
            where: {id: tripId},
            data: { is_confirmed: true }
        })

        return reply.redirect(`http://localhost:3000/trips/${tripId}`)
    });
}