import {
	TextField,
	IconButton,
	Button,
	Stack,
	Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { v4 as uuidv4 } from "uuid";

export type MultiImportItem = {
	id: string;
	value: string;
};

interface MultiTextInputProps {
	values: MultiImportItem[];
	onChange: (newValues: MultiImportItem[]) => void;
}

export default function MultiTextInput({
	values,
	onChange,
}: MultiTextInputProps) {
	const handleChange = (id: string, value: string) => {
		const newValues = values.map((item) =>
			item.id === id ? { ...item, value } : item,
		);
		onChange(newValues);
	};

	const handleAdd = () => {
		onChange([...values, { id: uuidv4(), value: "" }]);
	};

	const handleRemove = (id: string) => {
		onChange(values.filter((item) => item.id !== id));
	};

	return (
		<Stack spacing={2}>
			{values.length === 0 ? (
				<Typography>No items</Typography>
			) : (
				values.map((item) => (
					<Stack direction="row" spacing={1} alignItems="center" key={item.id}>
						<TextField
							value={item.value}
							onChange={(e) => handleChange(item.id, e.target.value)}
							variant="outlined"
							size="small"
							fullWidth
							autoFocus
						/>
						<IconButton
							aria-label="remove"
							onClick={() => handleRemove(item.id)}
							disabled={values.length === 1}
							edge="end"
							size="small"
						>
							<RemoveIcon />
						</IconButton>
					</Stack>
				))
			)}

			<Button
				variant="contained"
				startIcon={<AddIcon />}
				onClick={handleAdd}
				size="small"
			>
				Add
			</Button>
		</Stack>
	);
}
