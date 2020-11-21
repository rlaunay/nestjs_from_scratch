import * as dotenv from 'dotenv';
dotenv.config();

const url = process.env.DB_URL.replace('{{username}}', process.env.DB_USERNAME)
  .replace('{{password}}', process.env.DB_PASSWORD)
  .replace('{{db_name}}', process.env.DB_NAME);

export const config = {
  port: process.env.PORT,
  db_url: url,
};
