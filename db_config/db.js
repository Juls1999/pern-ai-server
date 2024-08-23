const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "juls@postgres",
  host: "localhost",
  port: 5432,
  database: "openai_text_generation"
});

module.exports = pool;
