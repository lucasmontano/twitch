import express from 'express';

import './bootstrap';

const app = express();

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.use(express.json());

app.listen(process.env.APP_PORT);
console.log(`🚀  Server ready at ${process.env.APP_URL}`);
