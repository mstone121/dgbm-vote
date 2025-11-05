export type AppState = {
	currentStage: Stage;
	voters: Voter[];
	candidates: Candidate[];
};

export enum Stage {
	ENTER_VOTERS,
	ENTER_CANDIDATES,
	RANKED_VOTE,
	RANKED_VOTE_RESULTS,
	RUNOFF_VOTE,
	RUNOFF_VOTE_RESULTS,
}

export type Voter = string;

export type Candidate = {
	name: string;
	rankedVoteScore: number;
	runoffVoteScore: number;
};

export enum Action {
	SET_CURRENT_STAGE,
	ADD_VOTER,
	ADD_CANDIDATE,
	SET_CANDIDATE_SCORE,
}

export type ActionWithPayload =
	| { type: Action.SET_CURRENT_STAGE; payload: Stage }
	| { type: Action.ADD_VOTER; payload: Voter }
	| { type: Action.ADD_CANDIDATE; payload: Candidate["name"] }
	| {
			type: Action.SET_CANDIDATE_SCORE;
			payload: {
				candidate: Candidate["name"];
				type: "ranked" | "runoff";
				score: number;
			};
	  };
