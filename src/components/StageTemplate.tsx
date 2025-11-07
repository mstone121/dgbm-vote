import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

interface StageTemplateProps {
	title: string;
	prevButton?: ReactNode;
	nextButton?: ReactNode;
	children?: ReactNode;
}

export default function StageTemplate({
	title,
	prevButton,
	nextButton,
	children,
}: StageTemplateProps) {
	return (
		<Box
			sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 2 }}
		>
			<Typography
				variant="h5"
				component="h2"
				sx={{ textAlign: "center", mb: 4 }}
			>
				{title}
			</Typography>

			<Box sx={{ mb: 3, mt: 2 }}>{children}</Box>

			<Stack
				direction="row"
				justifyContent="flex-start"
				spacing={2}
				width="100%"
			>
				<Box flexGrow={1}>{prevButton}</Box>
				<Box>{nextButton}</Box>
			</Stack>
		</Box>
	);
}
