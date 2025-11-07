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

export type Voter = {
	id: string;
	label: string;
};

export type Candidate = {
	id: string;
	label: string;
	rankedVoteScore: number;
	runoffVoteScore: number;
};

export enum Action {
	SET_CURRENT_STAGE,
	SET_VOTERS,
	SET_CANDIDATES,
	SET_RANKED_VOTE_RESULTS,
	SET_RUNOFF_VOTE_RESULTS,
}

export type ActionWithPayload =
	| { type: Action.SET_CURRENT_STAGE; payload: Stage }
	| { type: Action.SET_VOTERS; payload: Voter[] }
	| { type: Action.SET_CANDIDATES; payload: Candidate[] }
	| {
			type: Action.SET_RANKED_VOTE_RESULTS;
			payload: Record<string, number>;
	  }
	| {
			type: Action.SET_RUNOFF_VOTE_RESULTS;
			payload: Record<string, number>;
	  };
