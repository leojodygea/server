const Pool = require("pg").Pool;

const pool = new Pool({
  user: "jody",
  password: "1234",
  host: "localhost",
  port: "7733",
  database: "stock",
});

module.exports = pool;
