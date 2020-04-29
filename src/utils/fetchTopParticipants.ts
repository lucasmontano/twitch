import { Collection } from 'mongodb';

import { Participant } from '../types/participant';

export default async function fetchTopParticipants(
  participantsCollection: Collection<Participant>
): Promise<Participant[]> {
  const topParticipants = await participantsCollection
    .find() // TODO: apply projection to filter out _id
    .sort({ points: -1 })
    .limit(10)
    .toArray();

  return topParticipants;
}
