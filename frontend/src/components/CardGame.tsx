import clsx from "clsx";
import { Image } from "lucide-react";
import { formatDate } from "../lib/formatData";
import type { TData } from "../hooks/useGames";

type TCardGame = {
  game: TData;
  activeBorder: boolean;
};

export const CardGame = ({ game, activeBorder }: TCardGame) => {
  return (
    <div
      className={clsx(
        "card flex flex-col items-center justify-between gap-2 w-full max-h p-5",
        {
          border: activeBorder,
          "border-accent": activeBorder,
        }
      )}
    >
      <div className="flex items-center justify-center bg-base-200 w-20 h-20">
        <Image size={50} />
      </div>

      <div className="card-body items-center pt-2">
        <h2 className="card-title">{game.title}</h2>
        <div className="rating">
          <div
            className="mask mask-star-2 bg-accent"
            aria-current={game.rating === 1 ? true : false}
          ></div>
          <div
            className="mask mask-star-2 bg-accent"
            aria-current={game.rating === 2 ? true : false}
          ></div>
          <div
            className="mask mask-star-2 bg-accent"
            aria-current={game.rating === 3 ? true : false}
          ></div>
          <div
            className="mask mask-star-2 bg-accent"
            aria-current={game.rating === 4 ? true : false}
          ></div>
          <div
            className="mask mask-star-2 bg-accent"
            aria-current={game.rating === 5 ? true : false}
          ></div>
        </div>
        <p>Temps de jeux : {game.playtime}h</p>
        <p>Ajouté le : {formatDate(game.created_at)}</p>
      </div>
    </div>
  );
};
