import { useRef, useState } from "react";
import {
  useGames,
  type TOrderBy,
  type TPrivateQuery,
} from "../../hooks/useGames";
import { CardGame } from "../CardGame";
import { Search } from "lucide-react";

export const PrivateGames = () => {
  const titleInputref = useRef<HTMLInputElement>(null);
  const timePlayInputref = useRef<HTMLInputElement>(null);
  const ratingInputref = useRef<HTMLSelectElement>(null);
  const orderInputref = useRef<HTMLSelectElement>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [timePlay, setTimePlay] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [order, setOrder] = useState<TOrderBy | null>(null);

  const querySearchParams: TPrivateQuery = {
    title: title,
    rating: rating,
    playtime: timePlay,
    order: order,
  };
  const { data } = useGames("private", null, querySearchParams);

  const handleSearch = () => {
    const titleValue = titleInputref.current;
    const timePlayValue = timePlayInputref.current;
    const ratingValue = ratingInputref.current;
    const orderValue = orderInputref.current;

    if (!titleValue || !timePlayValue || !ratingValue || !orderValue) {
      return;
    }
    if (titleValue.value.length === 0) {
      setTitle(null);
    } else {
      setTitle(titleValue.value);
    }

    if (timePlayValue.value.length === 0) {
      setTimePlay(null);
    } else {
      setTimePlay(Number(timePlayValue.value));
    }

    if (ratingValue.value.length === 0) {
      setRating(null);
    } else {
      setRating(Number(ratingValue.value));
    }

    if (orderValue.value.length === 0) {
      setOrder(null);
    } else {
      setOrder(orderValue.value as TOrderBy);
    }
  };

  return (
    <div className="container m-auto">
      <div className="flex flex-col items-center gap-5">
        <div className="flex w-full justify-center mt-10">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-2xl border p-4">
            <legend className="fieldset-legend text-center">
              Entrez vos paramètres de recherche
            </legend>

            <div className="flex flex-row gap-4">
              <div>
                <label className="label text-white">Recherchez un jeux :</label>
                <input
                  type="text"
                  className="input mb-4"
                  placeholder="Entrez votre recherche ..."
                  ref={titleInputref}
                />

                <label className="label text-white">
                  Selectionnez une note :
                </label>
                <select
                  defaultValue="Pick a color"
                  className="select"
                  ref={ratingInputref}
                >
                  <option value={""}>Sans paramètre</option>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div>
                <label className="label text-white">
                  Heure de jeu suppérieur ou égal à :
                </label>
                <input
                  type="number"
                  className="input mb-4"
                  min="0"
                  placeholder="Insérer un nombre"
                  ref={timePlayInputref}
                />

                <label className="label text-white">Ordre d'affichage :</label>
                <select defaultValue="" className="select" ref={orderInputref}>
                  <option value="">Sans paramètre</option>
                  <option value="desc">Plus récent</option>
                  <option value="asc">Moins récent</option>
                </select>
              </div>
            </div>

            <button
              className="btn btn-outline btn-accent mt-4"
              onClick={() => handleSearch()}
            >
              Lancer la recherche
              <Search size={16} />
            </button>
          </fieldset>
        </div>
        <div className="grid w-5xl grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
          {data && data.length > 0
            ? data.map((game) => (
                <CardGame key={game.id} activeBorder={true} game={game} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
