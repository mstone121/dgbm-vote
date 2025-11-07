import StageTemplate from "../components/StageTemplate";
import NavButton from "../components/NavButton";

import { Stage } from "../types";

export default function RankedVoteResults() {
	return (
		<StageTemplate
			title="Ranked Vote Results"
			prevButton={
				<NavButton
					destinationStage={Stage.RANKED_VOTE}
					label="Back to Voting"
					onClick={() => {}}
				/>
			}
			nextButton={
				<NavButton
					destinationStage={Stage.RUNOFF_VOTE}
					label="Runoff Vote"
					onClick={() => {}}
				/>
			}
		>
			{/* TODO: Display voting results */}
		</StageTemplate>
	);
}
