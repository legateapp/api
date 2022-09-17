import { config } from 'dotenv';

config({
  path: `.env`,
});

export const { NODE_ENV, LOG_DIR, JWT_SECRET, PORT } = process.env as {
  NODE_ENV: string;
  LOG_DIR: string;
  JWT_SECRET: string;
  PORT: string;
};
