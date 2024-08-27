import { TripInfos } from "../types/trip";

export interface TripsRepository {
    save(user: TripInfos): Promise<string>;
}