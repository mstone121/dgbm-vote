import type { ReactNode } from "react";

import { Stack } from "@mui/material";

export default function CandidateList({ children }: { children: ReactNode }) {
	return <Stack spacing={2}>{children}</Stack>;
}
