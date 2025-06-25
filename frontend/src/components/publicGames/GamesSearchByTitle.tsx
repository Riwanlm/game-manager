import { Search } from "lucide-react";
import type { TDataListe } from "../../hooks/useGames";
import { CardGame } from "../CardGame";

type TGamesSearchByTitle = {
  searchTitleRef: React.RefObject<HTMLInputElement | null>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  data: TDataListe | undefined;
  isLoading: boolean;
  error: any;
};

export const GamesSearchByTitle = ({
  searchTitleRef,
  title,
  setTitle,
  data,
  isLoading,
  error,
}: TGamesSearchByTitle) => {
  const handleInput = (): void => {
    const value = searchTitleRef.current?.value;
    if (!searchTitleRef.current) {
      return;
    }
    if (value?.length === 0) {
      setTitle("");
    }
    if (value) {
      setTitle(value);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="join w-full justify-center">
        <input
          type="text"
          className="input border-r-accent w-1/3 rounded-l-sm"
          name="title"
          defaultValue=""
          placeholder="Rechercher un jeu"
          ref={searchTitleRef}
        />
        <button
          className="join-item btn btn-outline btn-accent"
          onClick={() => handleInput()}
        >
          <Search size={18} />
        </button>
      </div>

      <div className="grid w-5xl grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
        {data && data.length > 0
          ? data.map((game) => (
              <CardGame key={game.id} activeBorder={true} game={game} />
            ))
          : null}
      </div>
    </div>
  );
};
