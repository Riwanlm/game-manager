import { Route, Routes } from "react-router-dom";
import "./App.css";
import PublicHome from "./pages/PublicHome";
import PrivateHome from "./pages/PrivateHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateUserGames from "./pages/PrivateUserGames";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicHome />} />
      <Route path="/user" element={<PrivateHome />} />
      <Route path="/user/my-games" element={<PrivateUserGames />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
