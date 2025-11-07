import { useMemo, useState } from "react";

import { Typography } from "@mui/material";

import { useAppDispatch, useAppState } from "../context";

import useCandidatesScores from "../hooks/use-candidates-scores";
import useVoterQueue from "../hooks/use-voter-queue";

import StageTemplate from "../components/StageTemplate";
import NavButton from "../components/NavButton";
import VoteScreen from "../components/VoteScreen";
import RunoffVoteInput from "../components/RunoffVoteInput";

import { Action, type Candidate, Stage } from "../types";

export default function RunoffVote() {
	const dispatch = useAppDispatch();
	const { candidates } = useAppState();
	const { currentVoter, ...voterQueue } = useVoterQueue();

	const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
		null,
	);

	const runOffCandidates = useMemo(
		() => determineRunoffCandidates(candidates),
		[candidates],
	);

	const candidatesScores = useCandidatesScores();

	const onSubmitVote = () => {
		if (!selectedCandidate) {
			console.warn("No candidate selected for runoff vote");
			return;
		}

		candidatesScores.current[selectedCandidate.id] += 1;

		voterQueue.advanceVoterQueue();
		setSelectedCandidate(null);
	};

	const setResults = () => {
		dispatch({
			type: Action.SET_RUNOFF_VOTE_RESULTS,
			payload: candidatesScores.current,
		});
	};

	return (
		<StageTemplate
			title="Runoff Voting"
			nextButton={
				voterQueue.isEmpty ? (
					<NavButton
						destinationStage={Stage.RUNOFF_VOTE_RESULTS}
						label="See Runoff Results"
						onClick={setResults}
					/>
				) : undefined
			}
		>
			{currentVoter ? (
				<VoteScreen voter={currentVoter} onSubmit={onSubmitVote}>
					<Typography variant="h6" mb={2}>
						{currentVoter.label}, please select your final candidate:
					</Typography>

					<RunoffVoteInput
						candidates={runOffCandidates}
						selectedCandidate={selectedCandidate}
						setSelectedCandidate={setSelectedCandidate}
					/>
				</VoteScreen>
			) : (
				<Typography variant="h6" align="center">
					All voters have voted!
				</Typography>
			)}
		</StageTemplate>
	);
}

const determineRunoffCandidates = (candidates: Candidate[]) => {
	const topScore = candidates
		.map((candidate) => candidate.rankedVoteScore)
		.reduce((a, b) => Math.max(a, b));

	const candidatesWithTopScore = candidates.filter(
		(candidate) => candidate.rankedVoteScore === topScore,
	);

	if (candidatesWithTopScore.length >= 2) {
		return candidatesWithTopScore;
	}

	const secondBestScore = candidates
		.filter((candidate) => candidate.rankedVoteScore < topScore)
		.map((candidate) => candidate.rankedVoteScore)
		.reduce((a, b) => Math.max(a, b), 0);

	const candidatesWithSecondBestScore = candidates.filter(
		(candidate) => candidate.rankedVoteScore === secondBestScore,
	);

	return [...candidatesWithTopScore, ...candidatesWithSecondBestScore];
};
