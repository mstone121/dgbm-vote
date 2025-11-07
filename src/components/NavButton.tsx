import { Button } from "@mui/material";

import { useAppDispatch } from "../context";

import { Action, Stage } from "../types";

export default function NavButton({
	destinationStage,
	label,
	onClick,
}: {
	destinationStage: Stage;
	label: string;
	onClick: () => void;
}) {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		onClick();
		dispatch({ type: Action.SET_CURRENT_STAGE, payload: destinationStage });
	};

	return (
		<Button variant="contained" onClick={handleClick}>
			{label}
		</Button>
	);
}
