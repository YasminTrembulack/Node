import { z } from 'zod';

export const TypeTripInfos = z.object({
    destination: z.string().min(4),
    starts_at: z.coerce.date(),
    ends_at: z.coerce.date(),
    owner_name: z.string(),
    owner_email: z.string().email(),
    emails_to_invite: z.array(z.string().email())
});

export type TripInfos = z.infer<typeof TypeTripInfos>;
