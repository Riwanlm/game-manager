import type { RefObject } from "react";
import type { TDataListe, TSortBy } from "../../hooks/useGames";
import { CardGameCarrousel } from "./CardGameCarrousel";

type TGamesByRatingOrPopularity = {
  data: TDataListe | undefined;
  isLoading: boolean;
  error: any;
  ratingOrPlayingRef: RefObject<HTMLSelectElement | null>;
  setSortBy: React.Dispatch<React.SetStateAction<TSortBy>>;
  sortBy: TSortBy;
};

export const GamesByRatingOrPopularity = ({
  data,
  isLoading,
  error,
  ratingOrPlayingRef,
  setSortBy,
  sortBy,
}: TGamesByRatingOrPopularity) => {
  const handleSelect = () => {
    const value = ratingOrPlayingRef.current?.value as TSortBy;
    if (
      !ratingOrPlayingRef.current ||
      !["rating", "playtime", "created_at"].includes(value)
    ) {
      return;
    }
    if (value && ["rating", "playtime", "created_at"].includes(value)) {
      setSortBy(value);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <fieldset className="fieldset w-full">
        <legend className="fieldset-legend text-sm">
          Afficher les derniers jeux :
        </legend>
        <select
          defaultValue="rating"
          className="select w-full"
          ref={ratingOrPlayingRef}
          onChange={() => handleSelect()}
        >
          <option value="rating">les mieux notés</option>
          <option value="playtime">les plus joués</option>
        </select>
      </fieldset>

      <div className="carousel w-lg border rounded-lg border-accent">
        {data && data.length > 0
          ? data.map((game, i) => (
              <CardGameCarrousel
                key={game.id}
                data={data}
                game={game}
                i={i}
                anchor={"slide"}
              />
            ))
          : null}
      </div>
    </div>
  );
};
