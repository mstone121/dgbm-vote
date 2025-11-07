import { Typography } from "@mui/material";

import { useAppState } from "../context";

import StageTemplate from "../components/StageTemplate";
import CandidateList from "../components/CandidateList";
import CandidateCard from "../components/CandidateCard";

export default function RunoffVoteResults() {
	const { candidates } = useAppState();

	const runOffCandidates = [...candidates]
		.filter((candidate) => candidate.runoffVoteScore > 0)
		.sort((a, b) => b.runoffVoteScore - a.runoffVoteScore);

	return (
		<StageTemplate title="Runoff Vote Results">
			<Typography variant="h6" mb={3}>
				Results
			</Typography>
			<CandidateList>
				{runOffCandidates.map((candidate) => (
					<CandidateCard
						key={candidate.id}
						candidate={candidate}
						showScore="runoff"
					/>
				))}
			</CandidateList>{" "}
		</StageTemplate>
	);
}
