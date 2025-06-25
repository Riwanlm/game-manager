const express = require("express");
const {
  findGamesByTitle,
  findGamesBySort,
  findAllGames,
} = require("../lib/gamesDAO");
const router = express.Router();

//Recherche par titre ou sortBy dans la liste uniquement : "rating", "playtime", "created_at".
router.get("/games", async (req, res) => {
  const { title, sortBy } = req.query;

  let games = null;
  try {
    if (title) {
      games = await findGamesByTitle(title);
    }
    if (sortBy) {
      games = await findGamesBySort(sortBy);
    }
    if (Object.keys(req.query).length === 0) {
      games = await findAllGames();
    }
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur recherche jeu public par titre");
  }
});

module.exports = router;
