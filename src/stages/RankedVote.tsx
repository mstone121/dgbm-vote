import StageTemplate from "../components/StageTemplate";
import NavButton from "../components/NavButton";

import { Stage } from "../types";

export default function RankedVote() {
	return (
		<StageTemplate
			title="Ranked Voting"
			prevButton={
				<NavButton
					destinationStage={Stage.ENTER_VOTERS}
					label="Back to Voters"
					onClick={() => {}}
				/>
			}
			nextButton={
				<NavButton
					destinationStage={Stage.RANKED_VOTE_RESULTS}
					label="See Results"
					onClick={() => {}}
				/>
			}
		>
			{/* TODO: Add ranked voting UI */}
		</StageTemplate>
	);
}
