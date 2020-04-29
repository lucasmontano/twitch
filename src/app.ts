import express from 'express';
// eslint-disable-next-line no-unused-vars
import mongodb, { Collection } from 'mongodb';
import ChatterService from './services/ChatterService';

const app = express();
app.use(express.json());

let topParticipants = [];

const { MongoClient } = mongodb;
const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function fetchTopParticipants(participantsCollection: Collection): void {
  return participantsCollection
    .find() // TODO: apply projection to filter out _id
    .sort({ points: -1 })
    .limit(10)
    .toArray((err, document) => {
      if (err) throw err;
      topParticipants = document.map((participant) => ({
        name: participant.name,
        points: participant.points,
      }));
    });
}

function incrementParticipantPoints(
  participantsCollection: Collection,
  viewer: string,
): Promise<void> {
  return participantsCollection
    .updateOne({ name: viewer }, { $inc: { points: 1 } })
    .then((result) => {
      if (!result.modifiedCount) {
        participantsCollection.insertOne({
          name: viewer,
          points: 1,
        });
      }
    })
    .catch((err) => console.error(`Failed to add review: ${err}`));
}

client.connect((err) => {
  if (err) throw err;

  const db = client.db(process.env.DATABASE_NAME);
  const participantsCollection = db.collection('participants');
  fetchTopParticipants(participantsCollection);
  setInterval(async () => {
    try {
      const viewers = await ChatterService.getViewers();

      viewers.forEach(async (viewer) => {
        await incrementParticipantPoints(participantsCollection, viewer);
      });

      fetchTopParticipants(participantsCollection);
    } catch (error) {
      console.log(error);
    }
  }, 60 * 1000);
});

app.get('/', (req, res) => res.json(topParticipants));

export default app;
