const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gamesdb",
  password: process.env.PASSWORD_BDD,
  port: process.env.DB_PORT,
});

pool
  .connect()
  .then(() => console.log("✅ Connecté à PostgreSQL via Docker"))
  .catch((err) => console.error("❌ Erreur connexion PostgreSQL", err));

module.exports = pool;
