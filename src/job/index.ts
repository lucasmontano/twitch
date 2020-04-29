import ChatterService from '../services/ChatterService';
import ParticipantControllers from '../controllers/ParticipantController';

setInterval(async () => {
  try {
    const participantController = new ParticipantControllers();
    const viewers = await ChatterService.getViewers();

    viewers.forEach(async (viewer) => {
      await participantController.incrementParticipantPoints(viewer);
    });
  } catch (error) {
    console.log(error);
  }
}, 6 * 1000);
