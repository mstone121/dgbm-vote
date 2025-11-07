import { Box, Card, Stack, Typography } from "@mui/material";

import type { Candidate } from "../types";

export default function CandidateCard({
	candidate,
	showRankedScore = false,
}: {
	candidate: Candidate;
	showRankedScore?: boolean;
}) {
	return (
		<Card sx={{ padding: 2, border: "1px solid #ccc" }}>
			<Stack direction="row" justifyContent="flex-start">
				<Box flexGrow={1}>
					<Typography variant="h6" gutterBottom>
						{candidate.label}
					</Typography>
				</Box>

				{showRankedScore ? (
					<Typography
						variant="h6"
						gutterBottom
						sx={{ marginLeft: 2, color: "text.secondary" }}
					>
						(Score: {candidate.rankedVoteScore})
					</Typography>
				) : null}
			</Stack>
		</Card>
	);
}
