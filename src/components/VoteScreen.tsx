import { type ReactNode, useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import type { Voter } from "../types";

interface RankedVoteScreenProps {
	voter: Voter;
	onSubmit: () => void;
	children: ReactNode;
	disabledSubmit?: boolean;
}

enum VoteStatus {
	START,
	VOTING,
	DONE,
}

export default function VoteScreen({
	voter,
	children,
	onSubmit,
	disabledSubmit = false,
}: RankedVoteScreenProps) {
	const [voteStatus, setVoteStatus] = useState<VoteStatus>(VoteStatus.START);

	// biome-ignore lint/correctness/useExhaustiveDependencies: must reset when voter changes
	useEffect(() => {
		setVoteStatus(VoteStatus.START);
	}, [voter]);

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

				<Button variant="contained" onClick={onSubmit} sx={{ mt: 3 }}>
					Continue
				</Button>
			</Box>
		);
	}

	if (voteStatus === VoteStatus.VOTING) {
		return (
			<Stack>
				{children}

				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						setVoteStatus(VoteStatus.DONE);
					}}
					sx={{ mt: 3 }}
					disabled={disabledSubmit}
				>
					Submit Vote
				</Button>
			</Stack>
		);
	}

	return null;
}
