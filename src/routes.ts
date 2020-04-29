import { Router } from 'express';
import ParticipantController from './controllers/ParticipantController';

const routes = Router();

routes.get('/', async (req, res) => res.send(await new ParticipantController().fetchTopParticipants()));

export default routes;
