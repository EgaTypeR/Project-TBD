const Pool = require("pg").Pool

const pool = new Pool({
  user: "postgres",
  host: "172.173.214.81",
  database: "project-TBD",
  password: "Tbd0000",
  port: 5432
})

module.exports = pool