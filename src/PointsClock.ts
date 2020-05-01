import ChatterService from './services/ChatterService'
import DatabaseClient from './database/index'
import { Participant } from './types/participant'
import incrementParticipantPoints from './utils/incrementParticipantPoints'

class PointsClock{
  interval: number

  client: DatabaseClient

  constructor(interval, client){
    this.interval = interval
    this.client = client
  }

  run(){
    setInterval(this.addPoints.bind(this), this.interval);
  }

  async addPoints(){
    try {
      const viewers = await ChatterService.getViewers();

      const participantsCollection = this.client.getCollection<Participant>(
        'participants',
      );
  
      viewers.forEach(async (viewer) => {
        const isCreated = await participantsCollection.findOne({
          name: viewer,
        });
        
        if (!isCreated) {
          await participantsCollection.insertOne({ name: viewer, points: 1 });
        } else {
          await incrementParticipantPoints(participantsCollection, viewer);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default PointsClock