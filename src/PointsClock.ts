import ChatterService from './services/ChatterService'
import ParticipantRepository from './repository/ParticipantRepository'

class PointsClock{
  interval: number

  constructor(interval){
    this.interval = interval
  }

  run(){
    setInterval(PointsClock.addPoints, this.interval);
  }

  static async addPoints(){
    try {
      const viewers = await ChatterService.getViewers();
  
      viewers.forEach(async (viewer) => {
        const isCreated = await ParticipantRepository.findOne({
          name: viewer,
        });
        
        if (!isCreated) {
          await ParticipantRepository.insertOne({ name: viewer, points: 1 });
        } else {
          await ParticipantRepository.incrementParticipantPoints(viewer)
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default PointsClock