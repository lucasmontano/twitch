import { Collection } from 'mongodb';

import { Participant } from '../types/participant';

export default async function fetchTopParticipants(
  participantsCollection: Collection<Participant>
): Promise<Participant[]> {
  return participantsCollection
    .find({}, { projection: { name: 1, points: 1, _id: 0 } })
    .sort({ points: -1 })
    .limit(10)
    .toArray();
}
