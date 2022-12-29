import Express from 'express';
import { initDB, closeDB } from './src/database'
import { initEndpoints } from './src/endpoints'
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const server = Express();
const port = process.env.PORT || 8080;

initDB();

server.listen(port, () => {
  console.log('Server now listening on port ', port);
  return () => closeDB();
});

initEndpoints(server);