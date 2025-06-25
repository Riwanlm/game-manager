const db = require("./config/db");
const fs = require("fs");
const path = require("path");

const required_tables = ["users", "games"];
const initDb = async () => {
  const result = await db.query(
    "SELECT * FROM information_schema.tables where table_schema = 'public';"
  );
  const table_names = result.rows.map((row) => row.table_name);
  if (JSON.stringify(table_names) !== JSON.stringify(required_tables)) {
    const filePath = path.join(__dirname, "sql/database.sql");
    await db.query(fs.readFileSync(filePath, "utf8"));
  }
};

module.exports = initDb;
