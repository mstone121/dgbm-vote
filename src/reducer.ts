import { Action, type ActionWithPayload, type AppState } from "./types";

export default function appReducer(
  state: AppState,
  action: ActionWithPayload
): AppState {
  switch (action.type) {
    case Action.SET_CURRENT_STAGE:
      return { ...state, currentStage: action.payload };

    case Action.SET_VOTERS:
      return { ...state, voters: action.payload };

    case Action.SET_CANDIDATES:
      return { ...state, candidates: action.payload };

    case Action.SET_RANKED_VOTE_RESULTS:
      return {
        ...state,
        candidates: state.candidates.map((candidate) => ({
          ...candidate,
          rankedVoteScore: action.payload[candidate.id] ?? 0,
        })),
      };

    case Action.SET_RUNOFF_VOTE_RESULTS:
      return {
        ...state,
        candidates: state.candidates.map((candidate) => ({
          ...candidate,
          runoffVoteScore: action.payload[candidate.id] ?? 0,
        })),
      };
  }
}
