
// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';
import DatabaseClient from '../database';
import { Participant } from '../types/participant';
import incrementParticipantPoints from './incrementParticipantPoints';

const mongod = new MongoMemoryServer();

const getParticipant = jest.fn().mockReturnValue({ name: 'viewer', points: 2 });

describe('Testing incrementParticipantPoints function', () => {
  let client: DatabaseClient;

  beforeAll(async () => {
    const url = await mongod.getUri();
    const database = await mongod.getDbName();

    client = new DatabaseClient({
      url,
      database,
    });
  });

  afterAll(async () => {
    await client.close(true);
    await mongod.stop();
  });

  it('should increment participant points by 1', async () => {
    await client.connect();

    const participantsCollection = client.getCollection<Participant>(
      'participants'
    );

    const participant = getParticipant();
    await participantsCollection.insertOne(participant);

    const updateOperation = await incrementParticipantPoints(
      participantsCollection,
      participant.name
    );

    const updatedParticipant = await participantsCollection.findOne({
      name: participant.name,
    });

    console.log(
      `> Received updated participant: ${JSON.stringify(updatedParticipant)}`
    );

    expect(updateOperation.result.ok).toBe(1);
    expect(updatedParticipant.points).toBe(3);
  });
});
