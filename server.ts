import 'dotenv/config';
import Express from 'express';
import cors from 'cors';
import { initDB, closeDB } from './src/database';
import { initEndpoints } from './src/endpoints';

const server = Express();
server.use(cors());
const port = process.env.PORT || 8000;

initDB();

server.listen(port, () => {
  console.log('Server now listening on port ', port);
  return () => closeDB();
});

initEndpoints(server);