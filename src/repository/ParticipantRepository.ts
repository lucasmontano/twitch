import { Collection, FilterQuery, ObjectId, InsertOneWriteOpResult, WithId, UpdateWriteOpResult } from "mongodb"
import DatabaseClient from "../database"
import { Participant } from "../types/participant"

class ParticipantRepository {
  public participantCollection! : Collection<Participant>

  public init(client: DatabaseClient): void{
    this.participantCollection = client.getCollection('participants')
  }

  public async findOne(filter: FilterQuery<Participant>): Promise<Participant>{
    return this.participantCollection.findOne(filter)
  }

  public async insertOne(docs: Pick<Participant, "name" | "points"> & {_id?: ObjectId; }): Promise<InsertOneWriteOpResult<WithId<Participant>>>{
    return this.participantCollection.insertOne(docs)
  }

  public async fetchTopParticipants(): Promise<Participant[]> {
    return this.participantCollection
      .find({}, { projection: { name: 1, points: 1, _id: 0 } })
      .sort({ points: -1 })
      .limit(10)
      .toArray();
  }

  public async incrementParticipantPoints(name: string): Promise<UpdateWriteOpResult> {  
    const a = this.participantCollection.updateOne({ name }, {
      $inc: {
        points: 1,
      },
    });
    return a 
  }
} 

export default new ParticipantRepository()