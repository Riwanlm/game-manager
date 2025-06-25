import type { TDataListe } from "../../hooks/useGames";
import { CardGameCarrousel } from "./CardGameCarrousel";

type TGamesRecentlyPlay = {
  data: TDataListe | undefined;
  isLoading: boolean;
  error: any;
};

export const GamesRecentlyAdd = ({
  data,
  isLoading,
  error,
}: TGamesRecentlyPlay) => {
  return (
    <div className="flex flex-col gap-4 justify-end border rounded-lg border-accent">
      <h2 className="text-center text-lg p-2 w-full">
        Derniers jeux ajoutés :
      </h2>
      <div className="carousel w-lg">
        {data && data.length > 0
          ? data.map((game, i) => (
              <CardGameCarrousel
                key={game.id}
                data={data}
                game={game}
                i={i}
                anchor={"frame"}
              />
            ))
          : null}
      </div>
    </div>
  );
};
