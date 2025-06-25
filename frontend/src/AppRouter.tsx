import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { create } from "zustand";

type TuseLoggedStore = {
  isLogged: boolean;
  changeIsLogged: () => void;
};

type TuseIdGameStore = {
  id: number;
  setIdGame: (value: number) => void;
};

export const useLoggedStore = create<TuseLoggedStore>((set) => ({
  isLogged: false,
  changeIsLogged: () => set((state) => ({ isLogged: !state.isLogged })),
}));

export const useIdGameStore = create<TuseIdGameStore>((set) => ({
  id: 0,
  setIdGame: (value: number) => set({ id: value }),
}));

function AppRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppRouter;
