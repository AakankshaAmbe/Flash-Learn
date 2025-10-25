import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'flashuser',
  host: 'localhost',       // or your cloud host like db.neon.tech
  database: 'flashlearn3d',
  password: 'flashuser123',
  port: 5432,              // default PostgreSQL port
});
