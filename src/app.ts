import express from 'express';
import cors from 'cors';
import DatabaseClient from './database';

import ChatterService from './services/ChatterService';

import fetchTopParticipants from './utils/fetchTopParticipants';
import incrementParticipantPoints from './utils/incrementParticipantPoints';

import { Participant } from './types/participant';

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

setInterval(async () => {
  try {
    const viewers = await ChatterService.getViewers();
    const participantsCollection = client.getCollection<Participant>(
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
}, 60 * 1000);

app.get('/', cors(), async (req, res) => {
  const participantsCollection = client.getCollection<Participant>(
    'participants',
  );
  const topParticipants = await fetchTopParticipants(participantsCollection);

  return res.json(topParticipants);
});

export default app;
