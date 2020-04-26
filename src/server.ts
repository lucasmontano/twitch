import express from 'express';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '..', '.env') });

import App from './App';

const { getApp } = new App(express);
const { APP_PORT } = process.env;

getApp.listen(APP_PORT, () =>
  console.log(`Server running at port ${APP_PORT}`)
);
