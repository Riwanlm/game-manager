const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérification des champs
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    //Vérifier si l'email existe
    const emailCheck = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword]
    );

    res
      .status(201)
      .json({ message: "Nouvel utilisateur créé", user: result.rows[0] });
  } catch (err) {
    console.error("Erreur register: ", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Vérifier que les champs sont présents
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    //Cherche utilisateur
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    //Compaison mdp
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    //Génération token JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("auth", token, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
    res.status(200).json({
      message: "Connexion utilisateur réussie",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Erreur login: ", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = { register, login };
