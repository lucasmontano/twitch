import { Collection, FilterQuery, ObjectId } from "mongodb"
import DatabaseClient from "../database"
import { Participant } from "../types/participant"

class ParticipantRepository {
  private participantCollection! : Collection<Participant>

  public init(client: DatabaseClient): void{
    this.participantCollection = client.getCollection('participants')
  }

  public async findOne(filter: FilterQuery<Participant>): Promise<Participant>{
    return this.participantCollection.findOne(filter)
  }

  public async insertOne(docs: Pick<Participant, "name" | "points"> & {_id?: ObjectId; }){
    return this.participantCollection.insertOne(docs)
  }
} 

export default new ParticipantRepository()