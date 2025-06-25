const db = require("../config/db");

// ---- PRIVER ---- //

const findAllGamesOfUser = async (userId) => {
  try {
    const result = await db.query(
      `SELECT * FROM games WHERE user_id = $1 ORDER BY created_at DESC;`,
      [userId]
    );
    if (result.rows.length === 0) {
      console.error("Jeu non trouvé");
    }
    return result.rows;
  } catch (error) {
    console.log("Erreur recherche titre jeu", error);
    throw error;
  }
};

const getUserGamesByParams = async (title, rating, playtime, sortBy, order) => {
  const allowedSorts = ["title", "rating", "playtime", "created_at"];
  const allowedOrders = ["asc", "desc"];

  const sortColumn = allowedSorts.includes(sortBy) ? sortBy : "created_at";
  const sortOrder = allowedOrders.includes(order?.toLowerCase())
    ? order.toLowerCase()
    : "desc";

  const values = [];
  const whereClauses = [];

  if (title) {
    values.push(`%${title.toLowerCase()}%`);
    whereClauses.push(`LOWER(title) LIKE $${values.length}`);
  }

  if (rating) {
    values.push(Number(rating));
    whereClauses.push(`rating = $${values.length}`);
  }

  if (playtime) {
    values.push(Number(playtime));
    whereClauses.push(`playtime >= $${values.length}`);
  }

  const whereSQL = whereClauses.length
    ? `WHERE ${whereClauses.join(" AND ")}`
    : "";

  const query = `
    SELECT * FROM games
    ${whereSQL}
    ORDER BY ${sortColumn} ${sortOrder};
  `;

  try {
    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Erreur lecture jeux", error);
    throw error;
  }
};

const createGame = async (user_id, title, rating = 0, playtime = 0) => {
  try {
    const result = await db.query(
      `INSERT INTO games (user_id, title, rating, playtime)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, title, rating, playtime]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Erreur création jeu", error);
    throw error;
  }
};

const updateGame = async (title, rating, playtime, id) => {
  try {
    const result = await db.query(
      `UPDATE games SET title = $1, rating = $2, playtime = $3 WHERE id = $4 RETURNING *`,
      [title, rating, playtime, id]
    );
    if (result.rows.length === 0) {
      console.error("Jeu non trouvé");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Érreur mise à jour Jeu", error);
    throw error;
  }
};

const deleteGame = async (id) => {
  try {
    const result = await db.query(
      `DELETE FROM games WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      console.log("Jeu non trouvé");
      ReadableStreamDefaultController;
    }
    console.log("Jeu supprimé avec succès");
    return result.rows[0];
  } catch (error) {
    console.error("Erreur suppression jeu", error);
    return;
  }
};

// ---- FIN PRIVER ---- //

// ---- PUBLIC ---- //

const findAllGames = async () => {
  try {
    const result = await db.query(`SELECT * FROM games ORDER BY title asc;`);

    if (result.rows.length === 0) {
      console.error("Jeu non trouvé");
    }
    return result.rows;
  } catch (error) {
    console.log("Erreur recherche titre jeu", error);
    throw error;
  }
};

const findGamesByTitle = async (title) => {
  try {
    const result = await db.query(
      `SELECT * FROM games WHERE LOWER(title) LIKE $1;`,
      [`%${title.toLowerCase()}%`]
    );

    if (result.rows.length === 0) {
      console.error("Jeu non trouvé");
    }
    return result.rows;
  } catch (error) {
    console.log("Erreur recherche titre jeu", error);
    throw error;
  }
};

const findGamesBySort = async (sortBy) => {
  try {
    const allowedSorts = ["rating", "playtime", "created_at"];
    const sortColumn = allowedSorts.includes(sortBy) ? sortBy : "created_at";
    const result = await db.query(
      `SELECT * FROM games ORDER BY ${sortColumn} DESC;`
    );
    if (result.rows.length === 0) {
      console.error("Jeu non trouvé");
    }
    return result.rows;
  } catch (error) {
    console.log("Erreur recherche titre jeu", error);
    throw error;
  }
};

// ---- FIN PUBLIC ---- //

module.exports = {
  findAllGamesOfUser,
  getUserGamesByParams,
  createGame,
  updateGame,
  deleteGame,
  findAllGames,
  findGamesByTitle,
  findGamesBySort,
};
