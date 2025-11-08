import type { ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: { main: "#57975b" },
		secondary: { main: "#efcf63ff" },
	},
	typography: {
		fontFamily: "'Kanit', sans-serif",
	},
});

export default function Theme({ children }: { children: ReactNode }) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
