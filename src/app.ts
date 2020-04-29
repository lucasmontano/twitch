import express from 'express';

import routes from './routes';

import './database';
import './job';

const app = express();
app.use(express.json());
app.use(routes);

export default app;
