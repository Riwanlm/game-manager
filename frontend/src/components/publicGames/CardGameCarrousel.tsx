import { Image } from "lucide-react";
import type { TData, TDataListe } from "../../hooks/useGames";
import { formatDate } from "../../lib/formatData";

type TCardGameCarrousel = {
  data: TDataListe;
  game: TData;
  i: number;
  anchor: string;
};

export const CardGameCarrousel = ({
  data,
  game,
  i,
  anchor,
}: TCardGameCarrousel) => {
  return (
    <div
      id={`${anchor}${i + 1}`}
      className="carousel-item flex-col items-center relative w-full justify-center py-5"
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
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a
          href={`#${anchor}${i === 0 ? i + data.length : i}`}
          className="btn btn-circle"
        >
          ❮
        </a>
        <a
          href={`#${anchor}${i + 1 === data.length ? 1 : i + 2}`}
          className="btn btn-circle"
        >
          ❯
        </a>
      </div>
    </div>
  );
};
