/* eslint-disable */

import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { Participant } from '../types/participant';
import fetchTopParticipants from './fetchTopParticipants';

const mongod = new MongoMemoryServer();

const getParticipant = jest.fn().mockReturnValue({ name: 'viewer', points: 2 });

describe('Testing fetchTopParticipant function', () => {
  let client: MongoClient;

  beforeAll(async () => {
    const uri = await mongod.getUri();

    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await client.close(true);
    await mongod.stop();
  });

  it('should fetch top participants', async () => {
    const database = await mongod.getDbName();
    await client.connect();

    const participantsCollection = client
      .db(database)
      .collection<Participant>('participants');

    const participant = getParticipant();
    await participantsCollection.insertOne(participant);

    const topParticipants = await fetchTopParticipants(participantsCollection);

    console.log(
      `> Received top participants: ${JSON.stringify(topParticipants)}`
    );

    expect(topParticipants[0]).toMatchObject(participant);
  });
});
