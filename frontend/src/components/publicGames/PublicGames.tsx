import {
  useGames,
  type TPublicQuery,
  type TSortBy,
} from "../../hooks/useGames";
import { useRef, useState } from "react";
import { GamesByRatingOrPopularity } from "./GamesByRatingOrPopularity";
import { GamesSearchByTitle } from "./GamesSearchByTitle";
import { GamesRecentlyAdd } from "./GamesRecentlyAdd";

export const PublicGames = () => {
  const ratingOrPlayingRef = useRef<HTMLSelectElement>(null);
  const searchTitleRef = useRef<HTMLInputElement>(null);
  const [sortBy, setSortBy] = useState<TSortBy>("rating");
  const [title, setTitle] = useState("");

  const queryRatedOrPlayed: TPublicQuery = {
    title: "",
    sortBy: sortBy,
  };
  const queryRecentlyAdd: TPublicQuery = {
    title: "",
    sortBy: "created_at",
  };
  const queryTitle: TPublicQuery = {
    title: title,
    sortBy: "",
  };

  const {
    data: dataRatedOrPlayed,
    isLoading: isLoadingRatedOrPlayed,
    error: errorRatedOrPlayed,
  } = useGames("public", queryRatedOrPlayed, null);

  const {
    data: dataRecentlyAdd,
    isLoading: isLoadingRecentlyAdd,
    error: errorRecentlyAdd,
  } = useGames("public", queryRecentlyAdd, null);

  const {
    data: dataSearchTitle,
    isLoading: isLoadingSearchTitle,
    error: errorSearchTitle,
  } = useGames("public", queryTitle, null);

  return (
    <div className="container m-auto">
      <div className="flex justify-center my-10 gap-4">
        <GamesByRatingOrPopularity
          ratingOrPlayingRef={ratingOrPlayingRef}
          sortBy={sortBy}
          setSortBy={setSortBy}
          data={dataRatedOrPlayed}
          isLoading={isLoadingRatedOrPlayed}
          error={errorRatedOrPlayed}
        />
        <GamesRecentlyAdd
          data={dataRecentlyAdd}
          isLoading={isLoadingRecentlyAdd}
          error={errorRecentlyAdd}
        />
      </div>
      <GamesSearchByTitle
        searchTitleRef={searchTitleRef}
        title={title}
        setTitle={setTitle}
        data={dataSearchTitle}
        isLoading={isLoadingSearchTitle}
        error={errorSearchTitle}
      />
    </div>
  );
};
