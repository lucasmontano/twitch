/* eslint-disable */

import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { Participant } from '../types/participant';
import incrementParticipantPoints from './incrementParticipantPoints';

const mongod = new MongoMemoryServer();

const getParticipant = jest.fn().mockReturnValue({ name: 'viewer', points: 2 });

describe('Testing incrementParticipantPoints function', () => {
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

  it('should increment participant points by 1', async () => {
    const database = await mongod.getDbName();
    await client.connect();

    const participantsCollection = client
      .db(database)
      .collection<Participant>('participants');

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
