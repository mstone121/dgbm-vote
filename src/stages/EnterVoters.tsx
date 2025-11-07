import { useState } from "react";

import StageTemplate from "../components/StageTemplate";

import NavButton from "../components/NavButton";
import { Stage } from "../types";

export default function EnterVoters() {
	const [voters, setVoters] = useState<string[]>([]);

	return (
		<StageTemplate
			title="Enter Voters"
			nextButton={
				<NavButton
					destinationStage={Stage.ENTER_CANDIDATES}
					label={"Enter Candidates"}
					onClick={() => {}}
				/>
			}
			prevButton={
				<NavButton
					destinationStage={Stage.ENTER_CANDIDATES}
					label={"Back"}
					onClick={() => {}}
				/>
			}
		></StageTemplate>
	);
}
