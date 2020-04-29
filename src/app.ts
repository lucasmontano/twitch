import express from 'express';
import mongodb, { Collection } from 'mongodb';
import ChatterService from './services/ChatterService';
import { OptionsJson } from 'body-parser';

const app = express();
app.use(express.json());

let topParticipants = [];

const MongoClient = mongodb.MongoClient;
const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) throw err;

  const db = client.db(process.env.DATABASE_NAME);
  const participantsCollection = db.collection('participants');
  fetchTopParticipants(participantsCollection);
  setInterval(async () => {
    try {
      const viewers = await ChatterService.getViewers();

      for (const viewer of viewers) {
        await incrementParticipantPoints(participantsCollection, viewer);
      }

      fetchTopParticipants(participantsCollection);
    } catch (error) {
      console.error(error);
    }
  }, 60 * 1000);
});

function fetchTopParticipants(participantsCollection: Collection): void {
  return participantsCollection
    .find() // TODO: apply projection to filter out _id
    .sort({ points: -1 })
    .limit(10)
    .toArray((err, document) => {
      if (err) throw err;
      topParticipants = document.map((participant) => {
        return { name: participant.name, points: participant.points };
      });
    });
}

async function incrementParticipantPoints(
  participantsCollection: Collection,
  viewer: string,
): Promise<void> {
  try {
    const result = await participantsCollection
      .updateOne({ name: viewer }, { $inc: { points: 1 } });
    if (!result.modifiedCount) {
      await participantsCollection.insertOne({
        name: viewer,
        points: 1,
      });
    }
  } catch (err) {
    return console.error(`Failed to add review: ${err}`);
  }
}

app.get('/', (req, res) => res.json(topParticipants as OptionsJson));

export default app;
