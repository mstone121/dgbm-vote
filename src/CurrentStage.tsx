import { useAppState } from "./context";

import { Stage } from "./types";

export default function CurrentStage() {
	const { currentStage } = useAppState();

	switch (currentStage) {
		case Stage.ENTER_VOTERS:
			return <div>Enter Voters Stage</div>;
		case Stage.ENTER_CANDIDATES:
			return <div>Enter Candidates Stage</div>;
		case Stage.RANKED_VOTE:
			return <div>Ranked Vote Stage</div>;
		case Stage.RANKED_VOTE_RESULTS:
			return <div>Ranked Vote Results Stage</div>;
		case Stage.RUNOFF_VOTE:
			return <div>Runoff Vote Stage</div>;
		case Stage.RUNOFF_VOTE_RESULTS:
			return <div>Runoff Vote Results Stage</div>;
	}
}
