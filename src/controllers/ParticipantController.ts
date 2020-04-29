import Participant, { ParticipantData } from '../schema/Participant';

class ParticipantController {
  public async fetchTopParticipants(): Promise<ParticipantData[]> {
    const participants = await Participant.find().sort({ points: -1 }).limit(10);
    return participants;
  }

  public async incrementParticipantPoints(viewer: string): Promise<void> {
    const participant = await Participant.findOneAndUpdate(
      { name: viewer }, { $inc: { points: 1 } },
    );

    if (!participant) {
      await Participant.create({ name: viewer, points: 1 });
    }
  }
}

export default ParticipantController;
