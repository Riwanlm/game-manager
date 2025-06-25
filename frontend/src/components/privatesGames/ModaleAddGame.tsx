import { CircleCheckBig, CircleX } from "lucide-react";
import { useAddGame, type TGame } from "../../hooks/useAddGame";
import type { TDataListe } from "../../hooks/useGames";

type TModalAddGame = {
  modalAddGameRef: React.RefObject<HTMLDialogElement | null>;
  titleAddRef: React.RefObject<HTMLInputElement | null>;
  ratingAddRef: React.RefObject<HTMLInputElement | null>;
  playtimeAddRef: React.RefObject<HTMLInputElement | null>;
  games: TDataListe;
  setGames: React.Dispatch<React.SetStateAction<TDataListe>>;
};

export const ModalAddGame = ({
  modalAddGameRef,
  titleAddRef,
  ratingAddRef,
  playtimeAddRef,
  games,
  setGames,
}: TModalAddGame) => {
  const { trigger } = useAddGame();

  const closeModal = () => {
    if (
      !titleAddRef.current ||
      !ratingAddRef.current ||
      !playtimeAddRef.current
    ) {
      return;
    }
    titleAddRef.current.value = "";
    ratingAddRef.current.value = "";
    playtimeAddRef.current.value = "";
    modalAddGameRef.current?.close();
  };
  const validateModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !titleAddRef.current ||
      !ratingAddRef.current ||
      !playtimeAddRef.current
    ) {
      return;
    }

    const newGame: TGame = {
      title: titleAddRef.current.value,
      rating: Number(ratingAddRef.current.value),
      timeplay: Number(playtimeAddRef.current.value),
    };

    const dataTrigger = await trigger(newGame);
    if (!dataTrigger) {
      alert(`${dataTrigger.message}`);
    }

    setGames([...games, dataTrigger]);

    titleAddRef.current.value = "";
    ratingAddRef.current.value = "";
    playtimeAddRef.current.value = "";

    modalAddGameRef.current?.close();
  };

  return (
    <dialog className="modal" ref={modalAddGameRef}>
      <div className="modal-box w-11/12">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-center mb-5">
          Ajoutez un nouveau jeu
        </h3>
        <form method="post" onSubmit={(e) => validateModal(e)}>
          <div className="flex flex-col items-center">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Titre</legend>
              <input
                type="text"
                className="input w-80"
                placeholder="Entrez le titre"
                ref={titleAddRef}
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
                ref={ratingAddRef}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Temps de jeux</legend>
              <input
                type="text"
                className="input w-80"
                placeholder="Entrez le temps de jeux en heure"
                ref={playtimeAddRef}
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
              type="submit"
              className="btn btn-outline btn-accent"
              onClick={(e) => validateModal(e)}
            >
              <CircleCheckBig size={16} />
              Valider
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
