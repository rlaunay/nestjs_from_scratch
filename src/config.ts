import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT,
  db_name: process.env.DB_NAME,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
};
