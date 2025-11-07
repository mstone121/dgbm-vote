import { useState } from "react";

import { Typography } from "@mui/material";

import { useAppDispatch, useAppState } from "../context";

import useVoterQueue from "../hooks/use-voter-queue";
import useCandidatesScores from "../hooks/use-candidates-scores";

import StageTemplate from "../components/StageTemplate";
import { NextNavButton } from "../components/NavButton";
import VoteScreen from "../components/VoteScreen";
import RankedVoteInput from "../components/RankedVoteInput";

import { Action, type Candidate, Stage } from "../types";

export default function RankedVote() {
	const dispatch = useAppDispatch();
	const { candidates } = useAppState();
	const { currentVoter, ...voterQueue } = useVoterQueue();

	const [ranking, setRanking] = useState<Candidate[]>([...candidates]);

	const candidatesScores = useCandidatesScores();

	const onSubmitVote = () => {
		for (let i = 0; i < ranking.length; i++) {
			candidatesScores.current[ranking[i].id] += candidates.length - i;
		}

		voterQueue.advanceVoterQueue();
		setRanking([...candidates]);
	};

	const setResults = () => {
		dispatch({
			type: Action.SET_RANKED_VOTE_RESULTS,
			payload: candidatesScores.current,
		});
	};

	return (
		<StageTemplate
			title="Ranked Voting"
			nextButton={
				voterQueue.isEmpty ? (
					<NextNavButton
						destinationStage={Stage.RANKED_VOTE_RESULTS}
						label="See Results"
						onClick={setResults}
					/>
				) : undefined
			}
		>
			{currentVoter ? (
				<VoteScreen voter={currentVoter} onSubmit={onSubmitVote}>
					<Typography variant="h6" mb={2}>
						{currentVoter.label}, please rank the candidates by dragging and
						dropping:
					</Typography>

					<RankedVoteInput ranking={ranking} onRankChange={setRanking} />
				</VoteScreen>
			) : (
				<Typography variant="h6" align="center">
					All voters have voted!
				</Typography>
			)}
		</StageTemplate>
	);
}
