const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'IkanKing',
  password: 'Ardthian123',
  port: 5432,
});
pool.connect((err) => {
  if (err) {
    console.error('Database connection error', err.stack);
  } else {
    console.log('Database connected');
  }
});

module.exports = pool;







