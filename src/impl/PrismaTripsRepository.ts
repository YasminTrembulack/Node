import { PrismaClient } from "@prisma/client/edge";
import { TripsRepository } from "../services/TripsRepository";
import { TripInfos } from "../types/trip";

export class PrismaTripsRepository implements TripsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async save(trip: TripInfos): Promise<string> {
    const result = await this.prisma.trip.create({
      data: {
        destination: trip.destination,
        starts_at: trip.starts_at,
        ends_at: trip.ends_at,
        participant: {
          createMany: {
            data: [
              {
                name: trip.owner_name,
                email: trip.owner_email,
                is_owner: true,
                is_confirmed: true,
              },
              ...trip.emails_to_invite.map(email => ({
                email,
                is_owner: false,
                is_confirmed: false,
              })),
            ],
          },
        },
      },
    });
    return result.id ;
  }





}
