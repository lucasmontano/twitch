import express from 'express';

import ChatterService from './services/ChatterService';

const app = express();
app.use(express.json());

let viewerwersPoint = new Map();

setInterval(async () => {
  try {
    const viewers = await ChatterService.getViewers();

    viewers.forEach((viewer) => {
      let point = viewerwersPoint.get(viewer) ?? 0;
      viewerwersPoint.set(viewer, ++point);
      console.log(`${viewer} have ${point} points`);
    });
  } catch (error) {
    console.log(error);
  }
}, 60 * 1000);

app.get('/', (req, res) => {
  const viewers = Array.from(viewerwersPoint.entries()).map((viewer) => {
    const [name, points] = viewer;

    return {
      name,
      points,
    };
  });

  const top10 = viewers
    .sort((a, b) => (a.points > b.points ? 1 : -1))
    .slice(0, 10);

  return res.json({
    viewers,
    top10,
  });
});

export default app;
