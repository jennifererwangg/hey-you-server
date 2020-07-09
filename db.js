const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "PASSWORD",
  host: "localhost",
  port: "5432",
  database: "heyyou",
});

module.exports = pool;
