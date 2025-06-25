import useSWRMutation from "swr/mutation";

export type TUseRegister = {
  username: string;
  email: string;
  password: string;
};

const fetcher = async (url: string, { arg }: { arg: TUseRegister }) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());

export const useRegister = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    `${import.meta.env.VITE_BACKEND_HOST}/auth/register`,
    fetcher
  );

  return {
    trigger,
    data,
    error,
    isMutating,
  };
};
