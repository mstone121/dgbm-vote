import { Action, ActionWithPayload, AppState, Candidate } from "./types";

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

    case Action.SET_CANDIDATE_SCORE:
      return {
        ...state,
        candidates: updateCandidateById(
          state.candidates,
          action.payload.candidateId,
          (candidate) =>
            updateCandidateScore(
              candidate,
              action.payload.type,
              action.payload.score
            )
        ),
      };
  }
}

const updateCandidateById = (
  candidates: Candidate[],
  id: string,
  update: (candidate: Candidate) => Candidate
): Candidate[] =>
  candidates.map((candidate) =>
    candidate.id === id ? update(candidate) : candidate
  );

const updateCandidateScore = (
  candidate: Candidate,
  type: "ranked" | "runoff",
  score: number
): Candidate => {
  switch (type) {
    case "ranked":
      return { ...candidate, rankedVoteScore: score };
    case "runoff":
      return { ...candidate, runoffVoteScore: score };
  }
};
