import { Action, ActionWithPayload, AppState, Candidate } from "./types";

export default function appReducer(
  state: AppState,
  action: ActionWithPayload
): AppState {
  switch (action.type) {
    case Action.SET_CURRENT_STAGE:
      return { ...state, currentStage: action.payload };

    case Action.ADD_VOTER:
      return { ...state, voters: [...state.voters, action.payload] };

    case Action.ADD_CANDIDATE:
      return {
        ...state,
        candidates: [
          ...state.candidates,
          {
            name: action.payload,
            rankedVoteScore: 0,
            runoffVoteScore: 0,
          },
        ],
      };

    case Action.SET_CANDIDATE_SCORE:
      return {
        ...state,
        candidates: updateCandidateByName(
          state.candidates,
          action.payload.candidate,
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

const updateCandidateByName = (
  candidates: Candidate[],
  name: string,
  update: (candidate: Candidate) => Candidate
): Candidate[] =>
  candidates.map((candidate) =>
    candidate.name === name ? update(candidate) : candidate
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
