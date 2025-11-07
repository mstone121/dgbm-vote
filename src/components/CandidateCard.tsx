import { Box, Card, Stack, Typography } from "@mui/material";

import type { Candidate } from "../types";

export default function CandidateCard({
	candidate,
	score,
}: {
	candidate: Candidate;
	score?: number;
}) {
	return (
		<Card sx={{ padding: 2, border: "1px solid #ccc" }}>
			<Stack direction="row" justifyContent="flex-start">
				<Box flexGrow={1}>
					<Typography variant="h6" gutterBottom>
						{candidate.label}
					</Typography>
				</Box>

				{score !== undefined ? (
					<Typography
						variant="h6"
						gutterBottom
						sx={{ marginLeft: 2, color: "text.secondary" }}
					>
						(Score: {score})
					</Typography>
				) : null}
			</Stack>
		</Card>
	);
}
