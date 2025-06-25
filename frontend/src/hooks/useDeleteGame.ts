import useSWRMutation from "swr/mutation";

const fetcher = async (
  url: string,
  { arg: id }: { arg: string } // ID du jeu
) =>
  fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export const useDeleteGame = () => {
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
