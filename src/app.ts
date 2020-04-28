import express from 'express';

import ChatterService from './services/ChatterService';

const app = express();
app.use(express.json());

const participants = new Map();

setInterval(async () => {
  try {
    const viewers = await ChatterService.getViewers();

    viewers.forEach((viewer) => {
      let point = participants.get(viewer) ?? 0;
      participants.set(viewer, ++point);
      console.log(`${viewer} have ${point} points`);
    });
  } catch (error) {
    console.log(error);
  }
}, 60 * 1000);

app.get('/', (req, res) => {
  const factoryViewer = ([name, points]) => ({ name, points });
  const viewers = Array.from(participants).map(factoryViewer);

  const top10 = viewers
    .sort((a, b) => (a.points > b.points ? 1 : -1))
    .slice(0, 10);
  return res.json(top10);
});

export default app;
