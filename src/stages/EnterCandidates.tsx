import { useState } from "react";

import { useAppDispatch, useAppState } from "../context";

import StageTemplate from "../components/StageTemplate";
import NavButton from "../components/NavButton";
import MultiTextInput, {
	type MultiImportItem,
} from "../components/MultiTextInput";

import { Action, Candidate, Stage, type Voter } from "../types";

export default function EnterCandidates() {
	const dispatch = useAppDispatch();
	const { candidates: existingCandidates } = useAppState();

	const [candidates, setCandidates] = useState<MultiImportItem[]>(
		existingCandidates.map(candidateToMultiImportItem),
	);

	const saveCandidates = () => {
		dispatch({
			type: Action.SET_CANDIDATES,
			payload: candidates.map(multiImportItemToCandidate),
		});
	};

	return (
		<StageTemplate
			title="Enter Candidates"
			nextButton={
				<NavButton
					destinationStage={Stage.RANKED_VOTE}
					label={"Start Ranked Vote"}
					onClick={saveCandidates}
				/>
			}
			prevButton={
				<NavButton
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
