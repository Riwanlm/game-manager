import useSWRMutation from "swr/mutation";

const fetcher = async (url: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export const useLogout = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    `${import.meta.env.VITE_BACKEND_HOST}/auth/logout`,
    fetcher
  );

  return {
    trigger,
    data,
    error,
    isMutating,
  };
};
