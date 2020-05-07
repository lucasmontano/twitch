// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';
import DatabaseClient from "../database";
import ParticipantRepository from './ParticipantRepository';
import { Participant } from '../types/participant';

const mongod = new MongoMemoryServer();

async function asyncForEach(array: Array<string>, callback): Promise<void> {
  const results = [];
  for (let index = 0; index < array.length; index += 1) {
    results.push(callback(array[index], index, array));
  }
  await Promise.all(results);
}

describe("Participant Repository", () => {
  let client: DatabaseClient;

  beforeAll(async () => {
    const url = await mongod.getUri();
    const database = await mongod.getDbName();

    client = new DatabaseClient({
      url,
      database,
    });
    await client.connect();

  });

  beforeEach(async () => {
    await client.getCollection("participants").deleteMany({}) // Clean the collection in the test database
  })

  afterAll(async () => {
    await client.close(true);
    await mongod.stop();
  });
  
  it("should init the repository",async () => {
    ParticipantRepository.init(client)
    expect(ParticipantRepository.participantCollection).not.toBeUndefined()
  })

  it('should increment participant points by 1', async () => {
    await ParticipantRepository.participantCollection.insertOne({name:"LucasMontano", points: 1})

    await ParticipantRepository.incrementParticipantPoints("LucasMontano")

    const LucasMontanospoints = (await ParticipantRepository.participantCollection.findOne({name: "LucasMontano"})).points
    expect(LucasMontanospoints).toBe(2);
  });

  it('should fetch the top 10', async () => {
    const top10 = [
      "LucasMontano1",
      "LucasMontano2",
      "LucasMontano3",
      "LucasMontano4",
      "LucasMontano5",
      "LucasMontano6",
      "LucasMontano7",
      "LucasMontano8",
      "LucasMontano9",
      "LucasMontano10",
    ]

    await asyncForEach(top10.reverse(),async (name,points)=>{
      await ParticipantRepository.participantCollection.insertOne({name,points})
    })

    const response = await ParticipantRepository.fetchTopParticipants()

    expect(response).toEqual(expect.arrayContaining([
      expect.objectContaining({name: "LucasMontano1",points: 9}),
      expect.objectContaining({name: "LucasMontano2",points: 8}),
      expect.objectContaining({name: "LucasMontano3",points: 7}),
      expect.objectContaining({name: "LucasMontano4",points: 6}),
      expect.objectContaining({name: "LucasMontano5",points: 5}),
      expect.objectContaining({name: "LucasMontano6",points: 4}),
      expect.objectContaining({name: "LucasMontano7",points: 3}),
      expect.objectContaining({name: "LucasMontano8",points: 2}),
      expect.objectContaining({name: "LucasMontano9",points: 1}),
      expect.objectContaining({name: "LucasMontano10",points: 0}),

    ]))
  });
})
