import { Client } from 'pg';

export let database: Client;

export const initDB = () => {
  console.log(`Connecting to database: ${process.env.RDS_DATABASE} with username ${process.env.RDS_USERNAME}`);
  database = new Client({
    user: process.env.RDS_USERNAME,
    host: process.env.RDS_HOSTNAME,
    database: process.env.RDS_DATABASE,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
  });
  database.connect();
  
}

export const closeDB = () => {
  database.end();
}