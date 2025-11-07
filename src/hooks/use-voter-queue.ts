import { useState } from "react";

import { useAppState } from "../context";

import type { Voter } from "../types";

export default function useVoterQueue() {
  const { voters } = useAppState();
  const [voterQueue, setVoterQueue] = useState<Voter[]>([...voters]);

  return {
    currentVoter: voterQueue[0],
    advanceVoterQueue: () => {
      setVoterQueue(voterQueue.slice(1));
    },
    isEmpty: voterQueue.length === 0,
  };
}
