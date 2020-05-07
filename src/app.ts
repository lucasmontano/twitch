import express from 'express';
import cors from 'cors';
import DatabaseClient from './database';
import PointsClock from './PointsClock';
import ParticipantRepository from './repository/ParticipantRepository';

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

ParticipantRepository.init(client)

const pointsClock = new PointsClock(60*1000)
pointsClock.run()

app.get('/', cors(), async (req, res) => {
  const topParticipants = await ParticipantRepository.fetchTopParticipants();

  return res.json(topParticipants);
});

export default app;
