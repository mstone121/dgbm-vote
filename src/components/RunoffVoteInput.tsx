import CandidateCard from "./CandidateCard";
import CandidateList from "./CandidateList";

import type { Candidate } from "../types";

export default function RunoffVoteInput({
	candidates,
	selectedCandidate,
	setSelectedCandidate,
}: {
	candidates: Candidate[];
	selectedCandidate: Candidate | null;
	setSelectedCandidate: (candidate: Candidate | null) => void;
}) {
	return (
		<CandidateList>
			{candidates.map((candidate) => (
				<CandidateCard
					key={candidate.id}
					candidate={candidate}
					onClick={() => setSelectedCandidate(candidate)}
					selected={selectedCandidate?.id === candidate.id}
				/>
			))}
		</CandidateList>
	);
}
