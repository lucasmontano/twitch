import { Collection, FilterQuery, ObjectId } from "mongodb"
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

  public async insertOne(docs: Pick<Participant, "name" | "points"> & {_id?: ObjectId; }){
    return this.participantCollection.insertOne(docs)
  }

  public async fetchTopParticipants(): Promise<Participant[]> {
    return this.participantCollection
      .find({}, { projection: { name: 1, points: 1, _id: 0 } })
      .sort({ points: -1 })
      .limit(10)
      .toArray();
  }

  public async incrementParticipantPoints(name: string): Promise<any> {  
    return this.participantCollection.updateOne({ name }, {
      $inc: {
        points: 1,
      },
    });
  }
} 

export default new ParticipantRepository()