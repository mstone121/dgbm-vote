import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import RankedVoteInput from "./RankedVoteInput";

import type { Candidate, Voter } from "../types";

interface RankedVoteScreenProps {
	voter: Voter;
	candidates: Candidate[];
	onSubmit: (rankedCandidates: string[]) => void;
}

enum VoteStatus {
	START,
	VOTING,
	DONE,
}

export default function RankedVoteScreen({
	voter,
	candidates,
	onSubmit,
}: RankedVoteScreenProps) {
	const [voteStatus, setVoteStatus] = useState<VoteStatus>(VoteStatus.START);
	const [ranking, setRanking] = useState<Candidate[]>([...candidates]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: We want to reset when voter changes
	useEffect(() => {
		setRanking([...candidates]);
		setVoteStatus(VoteStatus.START);
	}, [voter, candidates]);

	if (voteStatus === VoteStatus.START) {
		return (
			<Box textAlign="center" mt={4}>
				<Typography variant="h6" gutterBottom>
					Voter: {voter.label}
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setVoteStatus(VoteStatus.VOTING)}
				>
					Start Voting
				</Button>
			</Box>
		);
	}

	if (voteStatus === VoteStatus.DONE) {
		return (
			<Box textAlign="center" mt={4}>
				<Typography variant="h6" gutterBottom>
					Thank you for voting, {voter.label}!
				</Typography>

				<Button
					variant="contained"
					onClick={() => {
						onSubmit(ranking.map((candidate) => candidate.id));
					}}
					sx={{ mt: 3 }}
				>
					Continue
				</Button>
			</Box>
		);
	}

	if (voteStatus === VoteStatus.VOTING) {
		return (
			<Stack>
				<Typography variant="h6" sx={{ mb: 2 }}>
					{voter.label}, please rank the candidates by dragging and dropping:
				</Typography>

				<RankedVoteInput ranking={ranking} onRankChange={setRanking} />

				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						setVoteStatus(VoteStatus.DONE);
					}}
					sx={{ mt: 3 }}
				>
					Submit Vote
				</Button>
			</Stack>
		);
	}

	return null;
}
