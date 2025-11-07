import StageTemplate from "../components/StageTemplate";
import NavButton from "../components/NavButton";
import { Stage } from "../types";

export default function RunoffVoteResults() {
	return (
		<StageTemplate
			title="Runoff Vote Results"
			prevButton={
				<NavButton
					destinationStage={Stage.RUNOFF_VOTE}
					label="Back to Runoff"
					onClick={() => {}}
				/>
			}
		>
			{/* TODO: Display voting results */}
		</StageTemplate>
	);
}
