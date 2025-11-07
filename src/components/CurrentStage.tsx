import { useAppState } from "../context";

import EnterCandidates from "../stages/EnterCandidates";
import EnterVoters from "../stages/EnterVoters";
import RankedVote from "../stages/RankedVote";
import RankedVoteResults from "../stages/RankedVoteResults";
import RunoffVote from "../stages/RunoffVote";
import RunoffVoteResults from "../stages/RunoffVoteResult";

import { Stage } from "../types";

export default function CurrentStage() {
	const { currentStage } = useAppState();

	switch (currentStage) {
		case Stage.ENTER_VOTERS:
			return <EnterVoters />;
		case Stage.ENTER_CANDIDATES:
			return <EnterCandidates />;
		case Stage.RANKED_VOTE:
			return <RankedVote />;
		case Stage.RANKED_VOTE_RESULTS:
			return <RankedVoteResults />;
		case Stage.RUNOFF_VOTE:
			return <RunoffVote />;
		case Stage.RUNOFF_VOTE_RESULTS:
			return <RunoffVoteResults />;
	}
}
