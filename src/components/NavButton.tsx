import { Button, ButtonProps } from "@mui/material";

import { useAppDispatch } from "../context";

import { Action, type Stage } from "../types";

interface NavButtonProps extends ButtonProps {
	destinationStage: Stage;
	label: string;
	onClick?: () => void;
}

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

export const NextNavButton = (props: NavButtonProps) => {
	return <NavButton {...props} variant="contained" />;
};

export const PrevNavButton = (props: NavButtonProps) => {
	return <NavButton {...props} variant="text" />;
};
