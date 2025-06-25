import useSWRMutation from "swr/mutation";

export type TUseLogin = {
  email: string;
  password: string;
};

const fetcher = async (url: string, { arg }: { arg: TUseLogin }) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());

export const useLogin = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    `${import.meta.env.VITE_BACKEND_HOST}/auth/login`,
    fetcher
  );

  return {
    trigger,
    data,
    error,
    isMutating,
  };
};
