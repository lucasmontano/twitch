import express from 'express';

import ChatterService from './services/ChatterService';

const app = express();
app.use(express.json());

let topParticipants = new Array();

const MongoClient = require('mongodb').MongoClient;
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

      viewers.forEach(async (viewer) => {
        await incrementParticipantPoints(participantsCollection, viewer);
      });

      fetchTopParticipants(participantsCollection);
    } catch (error) {
      console.log(error);
    }
  }, 60 * 1000);
});

function fetchTopParticipants(participantsCollection: any) {
  participantsCollection
    .find()
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
  participantsCollection: any,
  viewer: string
) {
  await participantsCollection
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

app.get('/', (req, res) => {
  return res.json(topParticipants);
});

export default app;
