import { Box, Card, Stack, Typography } from "@mui/material";

import type { Candidate } from "../types";

export default function CandidateCard({
	candidate,
	onClick,
	showScore = false,
	selected = false,
}: {
	candidate: Candidate;
	onClick?: () => void;
	showScore?: "runoff" | "ranked" | false;
	showRunoffScore?: boolean;
	selected?: boolean;
}) {
	return (
		<Card
			sx={{
				padding: 2,
				border: "1px solid #ccc",
				cursor: onClick ? "pointer" : "default",
				backgroundColor: selected ? "rgba(25, 118, 210, 0.1)" : "inherit",
			}}
			onClick={onClick}
		>
			<Stack direction="row" justifyContent="flex-start">
				<Box flexGrow={1}>
					<Typography variant="h6" gutterBottom>
						{candidate.label}
					</Typography>
				</Box>

				{showScore ? (
					<Typography
						variant="h6"
						gutterBottom
						sx={{ marginLeft: 2, color: "text.secondary" }}
					>
						(Score:{" "}
						{showScore === "runoff"
							? candidate.runoffVoteScore
							: candidate.rankedVoteScore}
						)
					</Typography>
				) : null}
			</Stack>
		</Card>
	);
}
