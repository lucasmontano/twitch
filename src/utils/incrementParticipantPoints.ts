import { Collection, UpdateWriteOpResult } from 'mongodb';

import { Participant } from '../types/participant';

export default async function incrementParticipantPoints(
  participantsCollection: Collection<Participant>,
  viewer: string
): Promise<UpdateWriteOpResult> {
  const participant = await participantsCollection.findOne({ name: viewer });

  return participantsCollection.updateOne(participant, {
    $set: {
      points: participant.points + 1,
    },
  });
}
