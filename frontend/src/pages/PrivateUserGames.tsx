import { CirclePlus, Pencil, X } from "lucide-react";
import { Header } from "../components/Header";
import { useEffect, useRef, useState } from "react";
import { ModalEditGame } from "../components/privatesGames/ModalEditGame";
import { ModalAddGame } from "../components/privatesGames/ModaleAddGame";
import { useUserInfos } from "../hooks/useUserInfos";
import { useDeleteGame } from "../hooks/useDeleteGame";
import { useGames, type TDataListe } from "../hooks/useGames";
import { formatDate } from "../lib/formatData";
import { useIdGameStore } from "../AppRouter";

const PrivateUserGames = () => {
  const [games, setGames] = useState<TDataListe>([]);

  const { data } = useGames("private", null, null);
  const { data: username } = useUserInfos();
  const { trigger } = useDeleteGame();
  const { setIdGame } = useIdGameStore();

  const titleAddRef = useRef<HTMLInputElement>(null);
  const ratingAddRef = useRef<HTMLInputElement>(null);
  const playtimeAddRef = useRef<HTMLInputElement>(null);

  const titleEditRef = useRef<HTMLInputElement>(null);
  const ratingEditRef = useRef<HTMLInputElement>(null);
  const playtimeEditRef = useRef<HTMLInputElement>(null);

  const modalAddGameRef = useRef<HTMLDialogElement>(null);
  const modalEditeRef = useRef<HTMLDialogElement>(null);

  const openAddGameModal = () => {
    if (modalAddGameRef.current) {
      modalAddGameRef.current.showModal();
    }
  };
  const openEditModal = (id: number) => {
    if (modalEditeRef.current) {
      setIdGame(id);
      modalEditeRef.current.showModal();
    }
  };
  const deleteGame = async (id: string) => {
    const dataTrigger = await trigger(id);
    if (!dataTrigger) {
      return;
    }
    const newGames = games.filter((game) => game.id !== Number(dataTrigger));
    setGames(newGames);
  };

  useEffect(() => {
    if (data) {
      setGames((games) => [...games, ...data]);
    }
  }, [data]);

  return (
    <div>
      <Header />
      <div className="container m-auto flex flex-col gap-10 mt-10 text-lg">
        <h2 className="text-center">
          Bienvenu {username}, ceci est votre espace pour gérer vos jeux
        </h2>
        <button
          className="btn btn-accent w-lg mx-auto"
          onClick={() => openAddGameModal()}
        >
          <CirclePlus size={20} />
          Ajouter un nouveau jeu
        </button>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Titre du jeu</th>
                <th>Note sur 5</th>
                <th>Temps de jeu</th>
                <th>Date d'ajout</th>
                <th>Modifier</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {games.length > 0
                ? games.map((game, i) => (
                    <tr key={game.id}>
                      <th>{i + 1}</th>
                      <td>{game.title}</td>
                      <td>{game.rating}</td>
                      <td>{game.playtime} heures</td>
                      <td>{formatDate(game.created_at)}</td>
                      <td>
                        <button
                          className="btn btn-soft btn-accent"
                          onClick={() => openEditModal(game.id)}
                        >
                          <Pencil size={16} />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-soft btn-error"
                          value={game.id}
                          onClick={() => deleteGame(game.id.toString())}
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
      {/*MODALE*/}
      <ModalAddGame
        modalAddGameRef={modalAddGameRef}
        titleAddRef={titleAddRef}
        ratingAddRef={ratingAddRef}
        playtimeAddRef={playtimeAddRef}
        games={games}
        setGames={setGames}
      />
      <ModalEditGame
        modalEditeRef={modalEditeRef}
        titleEditRef={titleEditRef}
        ratingEditRef={ratingEditRef}
        playtimeEditRef={playtimeEditRef}
        games={games}
        setgames={setGames}
      />
    </div>
  );
};

export default PrivateUserGames;
