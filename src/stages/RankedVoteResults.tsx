import { Typography } from "@mui/material";

import { useAppState } from "../context";

import StageTemplate from "../components/StageTemplate";
import NavButton from "../components/NavButton";
import CandidateList from "../components/CandidateList";
import CandidateCard from "../components/CandidateCard";

import { Stage } from "../types";

export default function RankedVoteResults() {
	const { candidates } = useAppState();

	const sortedCandidates = [...candidates].sort(
		(a, b) => b.rankedVoteScore - a.rankedVoteScore,
	);

	return (
		<StageTemplate
			title="Ranked Vote Results"
			nextButton={
				<NavButton
					destinationStage={Stage.RUNOFF_VOTE}
					label="Start Runoff Vote"
				/>
			}
		>
			<Typography variant="h6" sx={{ mb: 3 }}>
				Ranked Voting Results
			</Typography>

			<CandidateList>
				{sortedCandidates.map((candidate) => (
					<CandidateCard
						key={candidate.id}
						candidate={candidate}
						showRankedScore
					/>
				))}
			</CandidateList>
		</StageTemplate>
	);
}
