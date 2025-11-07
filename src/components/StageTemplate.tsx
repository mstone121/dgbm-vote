import { FC, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

interface StageTemplateProps {
	title: string;
	prevButton?: ReactNode;
	nextButton?: ReactNode;
	children?: ReactNode;
}

const StageTemplate: FC<StageTemplateProps> = ({
	title,
	prevButton,
	nextButton,
	children,
}) => (
	<Box
		sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 2 }}
	>
		<Typography variant="h5" component="h2" gutterBottom>
			{title}
		</Typography>

		<Box sx={{ mb: 3 }}>{children}</Box>

		<Stack direction="row" justifyContent="flex-start" spacing={2} width="100%">
			<Box flexGrow={1}>{prevButton}</Box>
			<Box>{nextButton}</Box>
		</Stack>
	</Box>
);

export default StageTemplate;
