const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const publicRoutes = require("./routes/publicRoutes");
const initDb = require("./initDb");
const cookieParser = require("cookie-parser");

initDb();

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send("API Game Manager OK"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/public", publicRoutes);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
