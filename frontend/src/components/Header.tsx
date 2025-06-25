import { Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useLoggedStore } from "../AppRouter";

export const Header = () => {
  const { isLogged, changeIsLogged } = useLoggedStore();
  const navigate = useNavigate();
  const { trigger } = useLogout();

  const disconnect = () => {
    trigger();
    changeIsLogged();
    navigate("/");
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <button
          className="btn btn-accent text-base-content text-xl"
          onClick={() => (isLogged ? navigate("/user") : navigate("/"))}
        >
          <Gamepad2 size={25} />
          Game Manager
        </button>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-6">
          {!isLogged && (
            <>
              <li>
                <button
                  className="btn btn-outline btn-accent"
                  onClick={() => navigate("/login")}
                >
                  Se connecter
                </button>
              </li>
              <li>
                <button
                  className="btn btn-outline btn-accent"
                  onClick={() => navigate("/register")}
                >
                  S'inscrire
                </button>
              </li>
            </>
          )}
          {isLogged && (
            <>
              <li>
                <button
                  className="btn btn-outline btn-accent"
                  onClick={() => navigate("/user/my-games")}
                >
                  Mes jeux
                </button>
              </li>
              <li>
                <button
                  className="btn btn-outline btn-accent"
                  onClick={() => disconnect()}
                >
                  Se déconnecter
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
