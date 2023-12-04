import 'dotenv/config';
import Express from 'express';
import cors from 'cors';
import { initDB, closeDB } from './src/database';
import { initEndpoints } from './src/endpoints';
import swStats from 'swagger-stats';
import { version } from './package.json';

const server = Express();
server.use(cors());
server.use(swStats.getMiddleware({
  version, uriPath: '/metrics',
  authentication: true,
  onAuthenticate: (req, username, password) => {
    return process.env.USERNAME === username && process.env.PASSWORD === password;
  }
}));
const port = process.env.PORT || 8000;

initDB();

server.listen(port, () => {
  console.log('Server now listening on port ', port);
  return () => closeDB();
});

initEndpoints(server);