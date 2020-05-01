import express from 'express';
import DatabaseClient from './database';

import ChatterService from './services/ChatterService';

import fetchTopParticipants from './utils/fetchTopParticipants';
import incrementParticipantPoints from './utils/incrementParticipantPoints';

import { Participant } from './types/participant';
import PointsClock from './PointsClock';

const app = express();
app.use(express.json());

const client = new DatabaseClient({
  url: process.env.MONGODB_URI,
  database: process.env.DATABASE_NAME,
});

client.connect((err) => {
  if (err) {
    console.log(`> Cannot connect to database: ${err}`);
    throw err;
  } else {
    console.log('> Database connected');
  }
});

const pointsClock = new PointsClock(60 * 1000,client)
pointsClock.run()

app.get('/', async (req, res) => {
  const participantsCollection = client.getCollection<Participant>(
    'participants',
  );
  const topParticipants = await fetchTopParticipants(participantsCollection);

  return res.json(topParticipants);
});

export default app;
