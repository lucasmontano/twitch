/* eslint-disable */

import { MongoMemoryServer } from 'mongodb-memory-server';
import { Participant } from '../types/participant';
import DatabaseClient from '../database';
import fetchTopParticipants from './fetchTopParticipants';

const mongod = new MongoMemoryServer();

const getParticipant = jest.fn().mockReturnValue({ name: 'viewer', points: 2 });

describe('Testing fetchTopParticipant function', () => {
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

  it('should fetch top participants', async () => {
    await client.connect();

    const participantsCollection = client.getCollection<Participant>(
      'participants'
    );

    const participant = getParticipant();
    await participantsCollection.insertOne(participant);

    const topParticipants = await fetchTopParticipants(participantsCollection);

    console.log(
      `> Received top participants: ${JSON.stringify(topParticipants)}`
    );

    expect(topParticipants[0]).toMatchObject({
      name: participant.name,
      points: participant.points,
    });
  });
});
