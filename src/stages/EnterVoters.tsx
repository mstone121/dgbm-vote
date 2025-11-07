import { useState } from "react";

import { useAppDispatch, useAppState } from "../context";

import StageTemplate from "../components/StageTemplate";
import NavButton from "../components/NavButton";
import MultiTextInput, {
	type MultiImportItem,
} from "../components/MultiTextInput";

import { Action, Stage, type Voter } from "../types";

export default function EnterVoters() {
	const dispatch = useAppDispatch();
	const { voters: existingVoters } = useAppState();

	const [voters, setVoters] = useState<MultiImportItem[]>(
		existingVoters.map(voterToMultiImportItem),
	);

	const saveVoters = () => {
		dispatch({
			type: Action.SET_VOTERS,
			payload: voters.map(multiImportItemToVoter),
		});
	};

	return (
		<StageTemplate
			title="Enter Voters"
			nextButton={
				<NavButton
					destinationStage={Stage.ENTER_CANDIDATES}
					label={"Save and Enter Candidates"}
					onClick={saveVoters}
				/>
			}
			prevButton={
				<NavButton
					destinationStage={Stage.ENTER_CANDIDATES}
					label={"Back"}
					variant="text"
				/>
			}
		>
			<MultiTextInput values={voters} onChange={setVoters} />
		</StageTemplate>
	);
}

const voterToMultiImportItem = (voter: {
	id: string;
	label: string;
}): MultiImportItem => ({
	id: voter.id,
	value: voter.label,
});

const multiImportItemToVoter = (item: MultiImportItem): Voter => ({
	id: item.id,
	label: item.value,
});
