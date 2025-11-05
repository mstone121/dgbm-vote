import { type ActionDispatch, createContext, useContext } from "react";

import { type ActionWithPayload, type AppState, Stage } from "./types";

export const AppStateContext = createContext<AppState>({
  currentStage: Stage.ENTER_VOTERS,
  voters: [],
  candidates: [],
});

export const AppDispatchContext = createContext<
  ActionDispatch<[action: ActionWithPayload]>
>(() => {});

export const useAppState = () => useContext(AppStateContext);

export const useAppDispatch = () => useContext(AppDispatchContext);
