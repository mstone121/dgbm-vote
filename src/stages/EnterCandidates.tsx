import { useState } from "react";

import StageTemplate from "../components/StageTemplate";
import NavButton from "../components/NavButton";

import { Stage } from "../types";

const EnterCandidates: React.FC = () => {
	const [candidates, setCandidates] = useState<string[]>([]);

	return (
		<StageTemplate
			title="Enter Candidates"
			nextButton={
				<NavButton
					destinationStage={Stage.RANKED_VOTE}
					label={"Start Ranked Voting"}
					onClick={() => {}}
				/>
			}
		></StageTemplate>
	);
};

export default EnterCandidates;
