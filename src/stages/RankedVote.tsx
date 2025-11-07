import { useRef, useState } from "react";

import { useAppDispatch, useAppState } from "../context";

import StageTemplate from "../components/StageTemplate";
import { NextNavButton } from "../components/NavButton";
import RankedVoteScreen from "../components/RankedVoteScreen";

import { Action, Stage, type Voter } from "../types";
import { Typography } from "@mui/material";

export default function RankedVote() {
	const dispatch = useAppDispatch();
	const { voters, candidates } = useAppState();

	const [voterQueue, setVoterQueue] = useState<Voter[]>(voters);
	const candidateScores = useRef(
		Object.fromEntries(candidates.map((candidate) => [candidate.id, 0])),
	);

	const onSubmitVote = (rankedCandidates: string[]) => {
		for (let i = 0; i < rankedCandidates.length; i++) {
			candidateScores.current[rankedCandidates[i]] += candidates.length - i;
		}

		setVoterQueue(voterQueue.slice(1));
	};

	const setResults = () => {
		dispatch({
			type: Action.SET_RANKED_VOTE_RESULTS,
			payload: candidateScores.current,
		});
	};

	const currentVoter = voterQueue[0];

	return (
		<StageTemplate
			title="Ranked Voting"
			nextButton={
				voterQueue.length === 0 ? (
					<NextNavButton
						destinationStage={Stage.RANKED_VOTE_RESULTS}
						label="See Results"
						onClick={setResults}
					/>
				) : undefined
			}
		>
			{currentVoter ? (
				<RankedVoteScreen
					voter={currentVoter}
					candidates={candidates}
					onSubmit={onSubmitVote}
				/>
			) : (
				<Typography variant="h6" align="center">
					All voters have voted!
				</Typography>
			)}
		</StageTemplate>
	);
}
