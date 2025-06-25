const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const {
  findAllGamesOfUser,
  getUserGamesByParams,
  createGame,
  updateGame,
  deleteGame,
  findGames,
} = require("../lib/gamesDAO");

//Recherche de jeux par params
router.get("/games", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const {
    title,
    rating,
    playtime,
    sortBy = "created_at",
    order = "desc",
  } = req.query;

  let games = null;
  try {
    if (!title && !rating && !playtime) {
      console.log("DEDANS 1");

      games = await findAllGamesOfUser(userId);
    } else {
      console.log("DEDANS 2");
      games = await getUserGamesByParams(
        title,
        rating,
        playtime,
        sortBy,
        order
      );
    }

    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur recherche de jeux privé");
  }
});

// Ajouter un jeu
router.post("/games", authenticateToken, async (req, res) => {
  const { title, rating, playtime, created_at } = req.body;
  const userId = req.user.userId;

  let game = null;

  try {
    game = await createGame(userId, title, rating, playtime);
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur création jeu");
  }
});

// Modifier un jeu
router.put("/games/:id", authenticateToken, async (req, res) => {
  const { title, rating, playtime } = req.body;
  const id = req.params.id;

  let game = null;
  try {
    game = await updateGame(title, rating, playtime, id);
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur mise à jour du jeu");
  }
});

//Supprimer un jeu
router.delete("/games/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  let game = null;

  try {
    game = deleteGame(id);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur suppression jeu");
  }
  res.json(id, {
    message: "Le jeu à bien été supprimé",
  });
});

router.get("/username", authenticateToken, (req, res) => {
  res.json(req.user.username);
});

module.exports = router;
