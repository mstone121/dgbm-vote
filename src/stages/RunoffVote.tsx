import StageTemplate from "../components/StageTemplate";
import NavButton from "../components/NavButton";

import { Stage } from "../types";

export default function RunoffVote() {
	return (
		<StageTemplate
			title="Runoff Voting"
			prevButton={
				<NavButton
					destinationStage={Stage.RANKED_VOTE_RESULTS}
					label="Back to Results"
					onClick={() => {}}
				/>
			}
			nextButton={
				<NavButton
					destinationStage={Stage.RUNOFF_VOTE_RESULTS}
					label="See Runoff Results"
					onClick={() => {}}
				/>
			}
		>
			{/* TODO: Add runoff voting UI */}
		</StageTemplate>
	);
}
