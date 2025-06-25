import { CircleCheckBig, CircleX } from "lucide-react";
import type { TDataListe } from "../../hooks/useGames";
import { useIdGameStore } from "../../AppRouter";

type TModal = {
  modalEditeRef: React.RefObject<HTMLDialogElement | null>;
  titleEditRef: React.RefObject<HTMLInputElement | null>;
  ratingEditRef: React.RefObject<HTMLInputElement | null>;
  playtimeEditRef: React.RefObject<HTMLInputElement | null>;

  games: TDataListe;
  setgames: React.Dispatch<React.SetStateAction<TDataListe>>;
};

export const ModalEditGame = ({
  modalEditeRef,
  titleEditRef,
  ratingEditRef,
  playtimeEditRef,
  games,
  setgames,
}: TModal) => {
  const { id } = useIdGameStore();
  const gameToEdit = games.filter((game) => game.id === id)[0];

  const closeModal = () => {
    if (
      !titleEditRef.current ||
      !ratingEditRef.current ||
      !playtimeEditRef.current
    ) {
      return;
    }
    modalEditeRef.current?.close();
  };

  const validateModal = () => {
    // const newGames = games.map;
    modalEditeRef.current?.close();
  };

  return (
    <dialog className="modal" ref={modalEditeRef}>
      <div className="modal-box w-11/12">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-center mb-5">
          Modifiez votre jeu
        </h3>
        <div className="flex flex-col items-center w-full">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Titre</legend>
            <input
              type="text"
              className="input w-80"
              placeholder="Entrez le titre"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Note</legend>
            <input
              type="number"
              min={0}
              max={5}
              className="input w-80"
              placeholder="Entrez une note entre 0 et 5"
              ref={ratingEditRef}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Temps de jeux</legend>
            <input
              type="text"
              className="input w-80"
              placeholder="Entrez le temps de jeux en heures"
              ref={playtimeEditRef}
            />
          </fieldset>
        </div>
        <div className="w-full flex justify-center gap-3 mt-5">
          <button
            className="btn btn-outline btn-error"
            onClick={() => closeModal()}
          >
            <CircleX size={16} />
            Annuler
          </button>
          <button
            className="btn btn-outline btn-accent"
            onClick={() => validateModal()}
          >
            <CircleCheckBig size={16} />
            Valider
          </button>
        </div>
      </div>
    </dialog>
  );
};
