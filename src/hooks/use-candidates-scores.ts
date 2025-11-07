import { useRef } from "react";

import { useAppState } from "../context";

export default function useCandidatesScores() {
  const { candidates } = useAppState();

  return useRef(
    Object.fromEntries(candidates.map((candidate) => [candidate.id, 0]))
  );
}
