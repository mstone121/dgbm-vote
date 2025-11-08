import { useState } from "react";

import { useAppDispatch, useAppState } from "../context";

import StageTemplate from "../components/StageTemplate";
import { NextNavButton, PrevNavButton } from "../components/NavButton";
import MultiTextInput, {
	type MultiImportItem,
} from "../components/MultiTextInput";

import { Action, type Candidate, Stage } from "../types";

export default function EnterCandidates() {
	const dispatch = useAppDispatch();
	const { candidates: existingCandidates } = useAppState();

	const [candidates, setCandidates] = useState<MultiImportItem[]>(
		existingCandidates.map(candidateToMultiImportItem),
	);

	const saveCandidates = () => {
		dispatch({
			type: Action.SET_CANDIDATES,
			payload: candidates
				.filter(removeEmptyCandidates)
				.map(multiImportItemToCandidate),
		});
	};

	return (
		<StageTemplate
			title="Enter Candidates"
			nextButton={
				<NextNavButton
					destinationStage={Stage.RANKED_VOTE}
					label={"Start Ranked Vote"}
					onClick={saveCandidates}
				/>
			}
			prevButton={
				<PrevNavButton
					destinationStage={Stage.ENTER_VOTERS}
					label={"Back"}
					variant="text"
				/>
			}
		>
			<MultiTextInput values={candidates} onChange={setCandidates} />
		</StageTemplate>
	);
}

const candidateToMultiImportItem = (candidate: {
	id: string;
	label: string;
}): MultiImportItem => ({
	id: candidate.id,
	value: candidate.label,
});

const multiImportItemToCandidate = (item: MultiImportItem): Candidate => ({
	id: item.id,
	label: item.value,
	rankedVoteScore: 0,
	runoffVoteScore: 0,
});

const removeEmptyCandidates = (item: MultiImportItem) =>
	item.value.trim() !== "";
