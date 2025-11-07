import { Button, ButtonProps } from "@mui/material";

import { useAppDispatch } from "../context";

import { Action, Stage } from "../types";

export default function NavButton({
	destinationStage,
	label,
	onClick,
	variant = "contained",
}: {
	destinationStage: Stage;
	label: string;
	onClick?: () => void;
	variant?: ButtonProps["variant"];
}) {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		onClick?.();
		dispatch({ type: Action.SET_CURRENT_STAGE, payload: destinationStage });
	};

	return (
		<Button variant={variant} onClick={handleClick}>
			{label}
		</Button>
	);
}
