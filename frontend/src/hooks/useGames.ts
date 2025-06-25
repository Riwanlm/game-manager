import useSWR from "swr";

type TQueryMode = "public" | "private";
export type TSortBy = "rating" | "playtime" | "created_at" | "title" | "";
export type TOrderBy = "asc" | "desc";

export type TPublicQuery = {
  title?: string | null;
  sortBy: TSortBy;
};

export type TPrivateQuery = {
  title: string | null;
  rating: number | null;
  playtime: number | null;
  order: TOrderBy | null;
};

export type TData = {
  id: number;
  user_id: number;
  title: string | null;
  rating: number;
  playtime: number;
  created_at: string;
};

export type TDataListe = TData[];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGames = (
  mode: TQueryMode,
  publicQuery: TPublicQuery | null,
  privateQuery: TPrivateQuery | null
) => {
  const uri = mode === "private" ? "/user/games" : "/public/games";
  const params =
    mode === "private"
      ? `${
          privateQuery?.title || privateQuery?.playtime || privateQuery?.rating
            ? "?"
            : ""
        }${privateQuery?.title ? "title=" + privateQuery.title : ""}${
          privateQuery?.rating ? "&rating=" + privateQuery.rating : ""
        }${privateQuery?.playtime ? "&playtime=" + privateQuery.playtime : ""}${
          privateQuery?.order ? "&order=" + privateQuery.order : ""
        }`
      : `?${publicQuery?.sortBy ? "sortBy=" + publicQuery.sortBy : ""}${
          publicQuery?.title ? "&title=" + publicQuery.title : ""
        }`;

  // console.log(`${import.meta.env.VITE_BACKEND_HOST}${uri}${params}`);

  const { data, error, isLoading } = useSWR<TDataListe>(
    `${import.meta.env.VITE_BACKEND_HOST}${uri}${params}`,
    fetcher
  );

  // console.log(data);

  return {
    data,
    isLoading,
    error,
  };
};
