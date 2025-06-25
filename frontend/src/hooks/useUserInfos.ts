import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    credentials: "include",
  }).then((res) => res.json());

export const useUserInfos = () => {
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_BACKEND_HOST}/user/username`,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
};
