import { useState } from "react";

import { useAppDispatch, useAppState } from "../context";

import StageTemplate from "../components/StageTemplate";
import { NextNavButton, PrevNavButton } from "../components/NavButton";
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
			payload: voters.filter(removeEmptyVoters).map(multiImportItemToVoter),
		});
	};

	return (
		<StageTemplate
			title="Enter Voters"
			nextButton={
				<NextNavButton
					destinationStage={Stage.ENTER_CANDIDATES}
					label={"Save and Enter Candidates"}
					onClick={saveVoters}
				/>
			}
			prevButton={
				<PrevNavButton
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

const removeEmptyVoters = (item: MultiImportItem) => item.value.trim() !== "";
