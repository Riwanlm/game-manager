import useSWRMutation from "swr/mutation";

export type TGame = {
  title: string;
  rating: number;
  timeplay: number;
};

const fetcher = async (url: string, { arg }: { arg: TGame }) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());

export const useAddGame = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    `${import.meta.env.VITE_BACKEND_HOST}/user/games`,
    fetcher
  );

  return {
    trigger,
    data,
    error,
    isMutating,
  };
};
